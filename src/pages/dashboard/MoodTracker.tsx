import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";
import { MOODS } from "@/types";
import { apiFetch } from "@/lib/api";

interface MoodLog {
  id: string;
  mood: string;
  score: number;
  created_at: string;
}

const MoodTracker = () => {
  const [logs, setLogs] = useState<MoodLog[]>([]);
  const [selected, setSelected] = useState<typeof MOODS[number] | null>(null);

  useEffect(() => {
    const fetchMood = async () => {
      try {
        const res = await apiFetch("/mood");

        const data = Array.isArray(res)
          ? res
          : res?.data || [];

        const formatted = data.map((m) => ({
          id: m.id,
          mood: m.mood_label,
          score: m.mood_score,
          created_at: m.created_at,
        }));

        setLogs(formatted);
      } catch (err) {
        console.error("Failed to load moods", err);
      }
    };

    fetchMood();
  }, []);

  const logMood = async () => {
    if (!selected) return;

    const scoreMap: Record<string, number> = {
      happy: 5,
      neutral: 3,
      sad: 2,
      anxious: 2,
      angry: 1,
    };

    const key = selected.label.toLowerCase();
    const score = scoreMap[key] ?? 3; // ✅ fallback safety

    try {
      await apiFetch("/mood", {
        method: "POST",
        body: {
          mood_score: score,
          mood_label: key,
          note: "",
        },
      });

      setLogs(prev => [{
        id: Date.now().toString(),
        mood: selected.label,
        score: score,
        created_at: new Date().toISOString(),
      }, ...prev]);

      setSelected(null);
    } catch (err) {
      console.error("Mood save failed", err);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-heading text-2xl font-bold">Mood Tracker</h1>
        <p className="text-sm text-muted-foreground font-body">How are you feeling right now?</p>
      </div>

      <div className="glass-card-strong rounded-2xl p-6 text-center">
        <div className="flex gap-4 justify-center mb-6">
          {MOODS.map(m => (
            <button
              key={m.label}
              onClick={() => setSelected(m)}
              className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all ${
                selected?.label === m.label
                  ? 'bg-primary/10 scale-110 shadow-md'
                  : 'hover:bg-muted hover:scale-105'
              }`}
            >
              <span className="text-3xl">{m.emoji}</span>
              <span className="text-xs font-body font-medium">{m.label}</span>
            </button>
          ))}
        </div>
        <Button onClick={logMood} disabled={!selected} variant="hero" size="lg">
          Log Mood
        </Button>
      </div>

      {logs.length > 1 && (
        <div className="glass-card rounded-2xl p-5">
          <h3 className="font-heading text-sm font-semibold mb-3">Recent Trend</h3>
          <svg viewBox="0 0 300 100" className="w-full h-24">
            <defs>
              <linearGradient id="moodGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--lavender))" stopOpacity="0.3" />
                <stop offset="100%" stopColor="hsl(var(--lavender))" stopOpacity="0" />
              </linearGradient>
            </defs>
            {(() => {
              const recent = logs.slice(0, 10).reverse();
              const points = recent.map((l, i) => ({
                x: (i / (recent.length - 1)) * 280 + 10,
                y: 90 - ((l.score - 1) / 4) * 70,
              }));
              const line = points.map(p => `${p.x},${p.y}`).join(' ');
              const area = `${points[0].x},90 ${line} ${points[points.length - 1].x},90`;
              return (
                <>
                  <polygon points={area} fill="url(#moodGrad)" />
                  <polyline points={line} fill="none" stroke="hsl(var(--lavender))" strokeWidth="2.5" />
                  {points.map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r="4" fill="white" stroke="hsl(var(--lavender))" strokeWidth="2" />
                  ))}
                </>
              );
            })()}
          </svg>
        </div>
      )}

      {logs.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <Activity className="h-12 w-12 text-blush-light mx-auto mb-4" />
          <h3 className="font-heading font-semibold mb-2">Start tracking your moods</h3>
          <p className="text-sm text-muted-foreground font-body">
            Select how you're feeling to begin building your emotional awareness.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <h3 className="font-heading text-sm font-semibold">History</h3>
          {logs.map(l => (
            <div key={l.id} className="glass-card rounded-xl px-4 py-3 flex justify-between">
              <div className="flex gap-3">
                <span className="text-xl">
                  {MOODS.find(m => m.label === l.mood)?.emoji}
                </span>
                <span>{l.mood}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {new Date(l.created_at).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoodTracker;