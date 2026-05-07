import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { MessageCircle, BookOpen, Wind, Activity, FileText, Sparkles, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MOODS } from "@/types";

const quickActions = [
  { to: "/dashboard/chat", icon: MessageCircle, label: "Talk to Aasha", color: "bg-lavender-light text-primary" },
  { to: "/dashboard/journal", icon: BookOpen, label: "Write Journal", color: "bg-sky-light text-sky" },
  { to: "/dashboard/breathe", icon: Wind, label: "Breathe", color: "bg-aqua-light text-aqua" },
  { to: "/dashboard/mood", icon: Activity, label: "Track Mood", color: "bg-blush-light text-blush" },
  { to: "/dashboard/lab-reports", icon: FileText, label: "Lab Reports", color: "bg-success-light text-success" },
];

const DashboardHome = () => {
  const { user } = useAuth();
  const name = user?.user_metadata?.full_name?.split(' ')[0] || "there";

  const [moods, setMoods] = useState([]);
  const [journals, setJournals] = useState([]); // ✅ added
  const [dark, setDark] = useState(false);

  // ✅ LOAD SAVED THEME
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  // ✅ TOGGLE FUNCTION
  const toggleDark = () => {
    const root = document.documentElement;

    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDark(false);
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDark(true);
    }
  };

  useEffect(() => {
    const test = async () => {
      try {
        const res = await apiFetch("/users");
        console.log("BACKEND:", res);
      } catch (err) {
        console.error("ERROR:", err);
      }
    };

    test();
  }, []);

  // ✅ FIXED MOOD FETCH
  useEffect(() => {
    const fetchMood = async () => {
      try {
        const res = await apiFetch("/mood");

        const data = Array.isArray(res)
          ? res
          : res?.data || [];

        setMoods(data.slice(0, 7).reverse());
      } catch (err) {
        console.error("Mood fetch failed", err);
      }
    };

    fetchMood();
  }, []);

  // ✅ FETCH JOURNALS (FIX)
  useEffect(() => {
    const fetchJournal = async () => {
      try {
        const res = await apiFetch("/diary");

        const data = Array.isArray(res)
          ? res
          : res?.data || [];

        setJournals(data.slice(0, 3)); // latest 3
      } catch (err) {
        console.error("Journal fetch failed", err);
      }
    };

    fetchJournal();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">

      {/* ✅ DARK MODE BUTTON */}
      <div className="flex justify-end">
        <Button onClick={toggleDark} size="sm" variant="secondary">
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>

      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold">
          Hey {name} 💜
        </h1>
        <p className="text-muted-foreground font-body mt-1">How are you feeling today?</p>
      </div>

      <div className="glass-card rounded-2xl p-5">
        <h3 className="font-heading text-sm font-semibold mb-3">Quick mood check</h3>
        <div className="flex gap-3 justify-center flex-wrap">
          {MOODS.map(m => (
            <Link
              key={m.label}
              to={`/dashboard/mood`}
              className={`flex flex-col items-center gap-1 px-4 py-3 rounded-2xl ${m.color} hover:scale-105 transition-transform cursor-pointer`}
            >
              <span className="text-2xl">{m.emoji}</span>
              <span className="text-xs font-body font-medium">{m.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {quickActions.map(a => (
          <Link
            key={a.to}
            to={a.to}
            className="glass-card rounded-2xl p-4 flex flex-col items-center gap-2 hover:shadow-lg transition-all hover:-translate-y-0.5"
          >
            <div className={`w-10 h-10 rounded-xl ${a.color} flex items-center justify-center`}>
              <a.icon className="h-5 w-5" />
            </div>
            <span className="text-xs font-body font-semibold text-center">{a.label}</span>
          </Link>
        ))}
      </div>

      {/* ✅ FIXED AASHA CARD (DARK MODE SAFE) */}
      <div className="glass-card-strong rounded-2xl p-6 bg-gradient-to-r from-primary/20 to-sky/20 dark:from-primary/30 dark:to-sky/30">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-lavender-glow flex items-center justify-center shrink-0">
            <Sparkles className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="font-heading font-semibold mb-1">Aasha is here for you</h3>
            <p className="text-sm text-muted-foreground font-body mb-3">
              Share what's on your mind. No judgment, just gentle support and understanding.
            </p>
            <Link to="/dashboard/chat">
              <Button size="sm">Start a Conversation</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="glass-card rounded-2xl p-5">
          <h3 className="font-heading text-sm font-semibold mb-2 flex items-center gap-2">
            <Activity className="h-4 w-4 text-blush" /> Mood Trend
          </h3>

          {moods.length === 0 ? (
            <p className="text-xs text-muted-foreground font-body">
              Start tracking your moods to see your emotional patterns here.
            </p>
          ) : (
            <svg viewBox="0 0 300 100" className="w-full h-24 mt-2">
              {(() => {
                const valid = moods.filter(m => m.mood_score !== undefined);

                if (valid.length === 0) return null;

                const points = valid.map((m, i) => ({
                  x: (i / (valid.length - 1 || 1)) * 280 + 10,
                  y: 90 - ((m.mood_score - 1) / 4) * 70,
                }));

                const line = points.map(p => `${p.x},${p.y}`).join(" ");

                return (
                  <>
                    <polyline
                      points={line}
                      fill="none"
                      stroke="hsl(var(--lavender))"
                      strokeWidth="2.5"
                    />
                    {points.map((p, i) => (
                      <circle key={i} cx={p.x} cy={p.y} r="4" fill="white" />
                    ))}
                  </>
                );
              })()}
            </svg>
          )}
        </div>

        {/* ✅ FIXED JOURNAL DISPLAY */}
        <div className="glass-card rounded-2xl p-5">
          <h3 className="font-heading text-sm font-semibold mb-2 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-sky" /> Recent Journals
          </h3>

          {journals.length === 0 ? (
            <p className="text-xs text-muted-foreground font-body">
              Your journal entries will appear here. Start writing to reflect on your day.
            </p>
          ) : (
            <div className="space-y-2">
              {journals.map((j: any) => (
                <div key={j.id} className="text-sm border-b pb-2">
                  <p className="font-semibold">{j.title || "Untitled"}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {j.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;