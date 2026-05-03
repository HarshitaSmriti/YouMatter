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

const Journal = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");

  // ✅ FETCH ENTRIES FROM BACKEND
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await apiFetch("/diary");

        console.log("📦 Diary response:", res);

        //  FIX: always ensure array
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

  //  ADD ENTRY
  const addEntry = async () => {
    if (!title.trim() || !content.trim()) return;

    const newEntry: Entry = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      mood,
      created_at: new Date().toISOString(),
    };

    try {
      //  FIXED BODY (most common backend format)
      await apiFetch("/diary", {
    method: "POST",
    body: JSON.stringify({
    title: newEntry.title,
    content: newEntry.content,
    mood: newEntry.mood,
      }),
    });

      // ✅ instant UI update
      setEntries((prev) => [newEntry, ...prev]);
    } catch (err) {
      console.error(" Failed to save journal", err);
    }

    setTitle("");
    setContent("");
    setMood("");
    setShowForm(false);
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
        <div className="glass-card-strong rounded-2xl p-6 animate-slide-up space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-heading font-semibold">New Entry</h3>
            <button
              onClick={() => setShowForm(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-xl"
          />

          <Textarea
            placeholder="What's on your mind..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="rounded-xl min-h-[120px]"
          />

          <div className="flex gap-2 flex-wrap">
            {MOODS.map((m) => (
              <button
                key={m.label}
                onClick={() => setMood(m.label)}
                className={`text-xl p-2 rounded-xl transition-all ${
                  mood === m.label
                    ? "bg-primary/10 scale-110"
                    : "hover:bg-muted"
                }`}
              >
                {m.emoji}
              </button>
            ))}
          </div>

          <Button
            onClick={addEntry}
            disabled={!title.trim() || !content.trim()}
          >
            Save Entry
          </Button>
        </div>
      )}

      {entries.length === 0 && !showForm ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <BookOpen className="h-12 w-12 text-sky-light mx-auto mb-4" />
          <h3 className="font-heading font-semibold mb-2">
            Your journal awaits
          </h3>
          <p className="text-sm text-muted-foreground font-body mb-4">
            Start writing to capture your thoughts and feelings.
          </p>
          <Button
            variant="secondary"
            onClick={() => setShowForm(true)}
          >
            Write your first entry
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {entries.map((e) => (
            <div
              key={e.id}
              className="glass-card rounded-2xl p-5 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-heading font-semibold">
                    {e.title}
                  </h3>
                  <p className="text-xs text-muted-foreground font-body mt-0.5">
                    {new Date(e.created_at).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                    {e.mood && ` • ${e.mood}`}
                  </p>
                </div>

                {e.mood && (
                  <span className="text-xl">
                    {
                      MOODS.find((m) => m.label === e.mood)
                        ?.emoji
                    }
                  </span>
                )}
              </div>

              <p className="text-sm text-muted-foreground font-body mt-2 line-clamp-3">
                {e.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Journal;