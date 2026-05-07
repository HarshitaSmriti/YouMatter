import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import api from "../config/api";
import { BookOpen, Pencil, Trash2, Plus, ArrowLeft, Leaf, Sun, CloudRain, Flame, Heart, Moon } from "lucide-react";

const MOODS = [
  { id: "calm",     label: "Calm",       Icon: Leaf,      accent: "#1D9E75", dark: "#0F6E56", tint: "#E1F5EE", inputBg: "#F0FBF7", inputBorder: "#9FE1CB", pageBg: "#F0FBF7", subtitle: "Write with stillness and peace" },
  { id: "happy",    label: "Happy",      Icon: Sun,       accent: "#BA7517", dark: "#854F0B", tint: "#FAEEDA", inputBg: "#FDF6EB", inputBorder: "#FAC775", pageBg: "#FDF6EB", subtitle: "Capture the joy you feel right now" },
  { id: "sad",      label: "Sad",        Icon: CloudRain, accent: "#378ADD", dark: "#185FA5", tint: "#E6F1FB", inputBg: "#F0F7FD", inputBorder: "#B5D4F4", pageBg: "#F0F7FD", subtitle: "Let your feelings flow without judgment" },
  { id: "anxious",  label: "Anxious",    Icon: Flame,     accent: "#D85A30", dark: "#993C1D", tint: "#FAECE7", inputBg: "#FDF4F0", inputBorder: "#F5C4B3", pageBg: "#FDF4F0", subtitle: "Release what weighs on your mind" },
  { id: "grateful", label: "Grateful",   Icon: Heart,     accent: "#D4537E", dark: "#993556", tint: "#FBEAF0", inputBg: "#FDF2F6", inputBorder: "#F4C0D1", pageBg: "#FDF2F6", subtitle: "Note the things you appreciate today" },
  { id: "reflect",  label: "Reflective", Icon: Moon,      accent: "#7F77DD", dark: "#534AB7", tint: "#EEEDFE", inputBg: "#F7F6FF", inputBorder: "#CECBF6", pageBg: "#F7F6FF", subtitle: "Explore your thoughts deeply" },
] as const;

type Mood = (typeof MOODS)[number];

interface JournalEntry {
  id: number;
  content: string;
  created_at: string;
  mood_id?: string;
}

function Journal() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [journals, setJournals] = useState<JournalEntry[]>([]);
  const [activeMood, setActiveMood] = useState<Mood>(MOODS[5]);

  

  const fetchJournals = async () => {
  try {
    const res = await api.get("/diary");

    console.log("FULL RESPONSE:", res);
    console.log("DATA:", res.data);

    setJournals(res.data.data || []);
  } catch (err) {
    console.log(err);
  }
};
  useEffect(() => { fetchJournals(); }, []);

  const addJournal = async () => {
    if (!title.trim() || !content.trim()) return;
    try {
      await api.post("/diary", {
        content: title + "\n\n" + content,
        mood_id: activeMood.id,
      });
      fetchJournals();
      setTitle("");
      setContent("");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteJournal = (id: number) => {
    setJournals(journals.filter((j) => j.id !== id));
  };

  const m = activeMood;

  return (
    <div
      className="flex min-h-screen transition-colors duration-500"
      style={{ backgroundColor: m.pageBg }}
    >
      <Sidebar />

      <main className="flex-1 px-4 py-6 sm:px-8">
        {/* BACK */}
        <button
          onClick={() => navigate("/home")}
          className="mb-6 flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold shadow-sm transition hover:bg-white/80"
          style={{ color: m.dark }}
        >
          <ArrowLeft size={16} />
          Back to home
        </button>

        {/* HEADER */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: m.accent }}>
            Personal journal
          </p>
          <h1 className="mt-2 text-[36px] font-black text-[#241b43] sm:text-[48px]">
            Reflect your thoughts
          </h1>
          <p className="mt-3 max-w-[640px] text-[15px] leading-8 text-[#6d6787]">
            Write freely, organize emotions, and track your mental wellness journey safely.
          </p>
        </div>

        {/* MOOD SELECTOR */}
        <div className="mt-6 flex flex-wrap gap-3">
          {MOODS.map((mood) => {
            const active = mood.id === activeMood.id;
            const { Icon } = mood;
            return (
              <button
                key={mood.id}
                onClick={() => setActiveMood(mood)}
                className="flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 bg-white"
                style={{
                  borderColor: active ? mood.accent : "transparent",
                  color: active ? mood.dark : "#6d6787",
                  backgroundColor: active ? mood.tint : "white",
                }}
              >
                <Icon size={15} />
                {mood.label}
              </button>
            );
          })}
        </div>

        {/* CREATE JOURNAL */}
        <div className="mt-8 rounded-[28px] bg-white p-6 shadow-sm sm:p-8 transition-all duration-500">
          <div className="flex items-center gap-4">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-2xl transition-colors duration-500"
              style={{ backgroundColor: m.tint }}
            >
              <BookOpen size={22} style={{ color: m.accent }} />
            </div>
            <div>
              <h2 className="text-[22px] font-black text-[#241b43]">New journal entry</h2>
              <p className="text-sm" style={{ color: m.accent }}>{m.subtitle}</p>
            </div>
          </div>

          <div className="mt-7 space-y-4">
            <input
              type="text"
              placeholder="Journal title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-2xl px-5 py-4 text-[#241b43] outline-none placeholder:text-[#9a92b5] transition-all duration-300"
              style={{ backgroundColor: m.inputBg, border: `1.5px solid ${m.inputBorder}` }}
            />
            <textarea
              placeholder="Write your thoughts here..."
              rows={7}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full resize-none rounded-3xl px-5 py-5 text-[#241b43] outline-none placeholder:text-[#9a92b5] transition-all duration-300"
              style={{ backgroundColor: m.inputBg, border: `1.5px solid ${m.inputBorder}` }}
            />
            <button
              onClick={addJournal}
              className="flex items-center gap-2 rounded-2xl px-6 py-4 text-sm font-bold text-white transition-all duration-300 hover:brightness-110"
              style={{ backgroundColor: m.accent }}
            >
              <Plus size={16} />
              Save journal
            </button>
          </div>
        </div>

        {/* JOURNAL LIST */}
        <div className="mt-10">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: m.accent }}>
            Recent entries
          </p>
          <h2 className="mt-2 text-[28px] font-black text-[#241b43]">Your journal</h2>

          {journals.length === 0 ? (
            <div className="mt-6 flex flex-col items-center justify-center rounded-[28px] bg-white px-6 py-20 text-center shadow-sm">
              <div
                className="flex h-20 w-20 items-center justify-center rounded-[24px] transition-colors duration-500"
                style={{ backgroundColor: m.tint }}
              >
                <BookOpen size={36} style={{ color: m.accent }} />
              </div>
              <h3 className="mt-6 text-[26px] font-black text-[#241b43]">No journals yet</h3>
              <p className="mt-3 max-w-[460px] text-[15px] leading-8 text-[#6d6787]">
                Start writing your first reflection and track your emotional journey gently.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              {journals.map((journal) => {
                const entryMood = MOODS.find((x) => x.id === journal.mood_id) ?? MOODS[5];
                const { Icon: EntryIcon } = entryMood;
                return (
                  <div
                    key={journal.id}
                    className="rounded-[28px] bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md"
                    style={{ borderLeft: `4px solid ${entryMood.accent}` }}
                  >
                    {/* TOP */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs text-[#9a92b5]">
                          {new Date(journal.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                        <h3 className="mt-1 text-[20px] font-black text-[#241b43]">
                          {journal.content?.split("\n\n")[0]}
                        </h3>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <span
                          className="flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold"
                          style={{ backgroundColor: entryMood.tint, color: entryMood.accent }}
                        >
                          <EntryIcon size={11} />
                          {entryMood.label}
                        </span>

                        <div className="flex gap-2">
                          <button
                            className="flex h-9 w-9 items-center justify-center rounded-xl transition hover:brightness-95"
                            style={{ backgroundColor: m.tint }}
                          >
                            <Pencil size={15} style={{ color: m.accent }} />
                          </button>
                          <button
                            onClick={() => deleteJournal(journal.id)}
                            className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#fff1f6] transition hover:bg-[#ffe5ee]"
                          >
                            <Trash2 size={15} className="text-[#ff7fa8]" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div
                      className="mt-5 rounded-2xl p-4 text-[14px] leading-7 text-[#6d6787] transition-colors duration-300"
                      style={{ backgroundColor: entryMood.inputBg }}
                    >
                      {journal.content?.split("\n\n")[1]}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Journal;