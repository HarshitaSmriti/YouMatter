import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, BookOpen, X } from "lucide-react";
import { MOODS } from "@/types";
import { apiFetch } from "@/lib/api";

interface Entry {
  id: string;
  title: string;
  content: string;
  mood: string;
  created_at: string;
}

// ✅ normalize mood safely
const normalizeMood = (label: string) => {
  const map: Record<string, string> = {
    happy: "happy",
    sad: "sad",
    angry: "angry",
    anxious: "anxious",
    neutral: "neutral",
  };

  const key = label?.toLowerCase().trim();
  return map[key];
};

const Journal = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await apiFetch("/diary");

        const safeData = Array.isArray(res)
          ? res
          : res?.data || res?.diary || [];

        setEntries(safeData);
      } catch (err) {
        console.error("Failed to load journal", err);
        setEntries([]);
      }
    };

    fetchEntries();
  }, []);

  // 🔹 Add entry
  const addEntry = async () => {
    if (!title.trim() || !content.trim()) return;

    const normalizedMood = normalizeMood(mood);

    const newEntry: Entry = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      mood: normalizedMood || "",
      created_at: new Date().toISOString(),
    };

    try {
      await apiFetch("/diary", {
        method: "POST",
        body: {
          title: newEntry.title,
          content: newEntry.content,
          mood: normalizedMood || undefined,
        },
      });

      setEntries((prev) => [newEntry, ...prev]);
    } catch (err) {
      console.error("Failed to save journal", err);
    }

    setTitle("");
    setContent("");
    setMood("");
    setShowForm(false);
  };

  // 🔴 DELETE
  const deleteEntry = async (id: string) => {
    try {
      await apiFetch(`/diary/${id}`, {
        method: "DELETE",
      });

      setEntries((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // 🔴 UPDATE
  const updateEntry = async (id: string) => {
    const newTitle = prompt("New title:");
    const newContent = prompt("New content:");

    if (!newTitle || !newContent) return;

    try {
      await apiFetch(`/diary/${id}`, {
        method: "PATCH",
        body: {
          title: newTitle,
          content: newContent,
        },
      });

      setEntries((prev) =>
        prev.map((e) =>
          e.id === id ? { ...e, title: newTitle, content: newContent } : e
        )
      );
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Journal</h1>
          <p className="text-sm text-muted-foreground font-body">
            Express yourself freely ✨
          </p>
        </div>
        <Button onClick={() => setShowForm(true)} size="sm">
          <Plus className="h-4 w-4" /> New Entry
        </Button>
      </div>

      {showForm && (
        <div className="glass-card-strong rounded-2xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-heading font-semibold">New Entry</h3>
            <button onClick={() => setShowForm(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>

          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Textarea
            placeholder="What's on your mind..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="flex gap-2 flex-wrap">
            {MOODS.map((m) => (
              <button
                key={m.label}
                onClick={() => setMood(m.label)}
                className={`text-xl p-2 rounded-xl ${
                  mood === m.label ? "bg-primary/10 scale-110" : ""
                }`}
              >
                {m.emoji}
              </button>
            ))}
          </div>

          <Button onClick={addEntry}>Save Entry</Button>
        </div>
      )}

      {entries.length === 0 && !showForm ? (
        <div className="text-center">
          <BookOpen className="h-12 w-12 mx-auto mb-4" />
          <p>No entries yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {entries.map((e) => (
            <div key={e.id} className="p-4 border rounded-xl">
              <h3>{e.title}</h3>
              <p>{e.content}</p>

              {e.mood && (
                <span>
                  {
                    MOODS.find(
                      (m) => normalizeMood(m.label) === e.mood
                    )?.emoji
                  }
                </span>
              )}

              {/* 🔴 NEW BUTTONS */}
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => updateEntry(e.id)}
                  className="text-blue-500 text-xs"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteEntry(e.id)}
                  className="text-red-500 text-xs"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Journal;