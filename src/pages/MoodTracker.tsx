import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Smile, Leaf, CloudRain, Zap, Flame, Minus, Activity,
} from "lucide-react";

type MoodKey = "happy" | "calm" | "sad" | "anxious" | "angry" | "neutral";

interface MoodEntry {
  mood: MoodKey;
  timestamp: number;
}

const MOOD_CONFIG: Record<MoodKey, {
  Icon: React.ElementType; label: string; accent: string; text: string;
  soft: string; iconBg: string; barColor: string; moodScore: number;
  description: string; graphLabel: string; orb1: string; orb2: string; bg: string;
}> = {
  happy: {
    Icon: Smile, label: "Happy", accent: "#f5a623", text: "#7a5c00",
    soft: "#fff3b0", iconBg: "#fff4d6", barColor: "#fbbf24", moodScore: 6,
    description: "Feeling joyful and uplifted today.",
    graphLabel: "Energy peaks throughout your happy day",
    orb1: "#fde68a", orb2: "#fbbf24", bg: "from-[#fffbea] to-[#fff7d4]",
  },
  calm: {
    Icon: Leaf, label: "Calm", accent: "#10b981", text: "#065f46",
    soft: "#a7f3d0", iconBg: "#e7faf4", barColor: "#34d399", moodScore: 5,
    description: "Steady and at peace with the moment.",
    graphLabel: "Gentle, consistent calm through the day",
    orb1: "#6ee7b7", orb2: "#34d399", bg: "from-[#f0fdf9] to-[#e6f9f5]",
  },
  neutral: {
    Icon: Minus, label: "Neutral", accent: "#8a6dff", text: "#3b2a8a",
    soft: "#ede9fe", iconBg: "#f3f0ff", barColor: "#a78bfa", moodScore: 4,
    description: "Neither high nor low — a balanced baseline.",
    graphLabel: "Steady state — a calm, even day",
    orb1: "#c4b5fd", orb2: "#a78bfa", bg: "from-[#fcfbff] to-[#f3f0ff]",
  },
  anxious: {
    Icon: Zap, label: "Anxious", accent: "#a855f7", text: "#581c87",
    soft: "#e9d5ff", iconBg: "#fdf4ff", barColor: "#c084fc", moodScore: 3,
    description: "Your mind is racing — breathe slowly.",
    graphLabel: "Fluctuating energy — try a calming exercise",
    orb1: "#d8b4fe", orb2: "#c084fc", bg: "from-[#fdf4ff] to-[#fae8ff]",
  },
  sad: {
    Icon: CloudRain, label: "Sad", accent: "#3b82f6", text: "#1e3a8a",
    soft: "#bfdbfe", iconBg: "#eef5ff", barColor: "#60a5fa", moodScore: 2,
    description: "Feeling low — that's okay. Be gentle with yourself.",
    graphLabel: "Lower energy levels — rest and reflect",
    orb1: "#93c5fd", orb2: "#60a5fa", bg: "from-[#eff6ff] to-[#dbeafe]",
  },
  angry: {
    Icon: Flame, label: "Angry", accent: "#ef4444", text: "#7f1d1d",
    soft: "#fecaca", iconBg: "#fff7f5", barColor: "#f87171", moodScore: 1,
    description: "Your feelings are valid. Let it out safely.",
    graphLabel: "High intensity — channel it somewhere healthy",
    orb1: "#fca5a5", orb2: "#f87171", bg: "from-[#fff7f5] to-[#ffe4de]",
  },
};

const MOOD_KEYS = Object.keys(MOOD_CONFIG) as MoodKey[];
const STORAGE_KEY = "youmatter_mood_log";
const LAST_MOOD_KEY = "youmatter_last_mood";

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString([], { month: "short", day: "numeric" });
}

const Y_LABELS: Record<number, string> = {
  6: "Happy", 5: "Calm", 4: "Neutral", 3: "Anxious", 2: "Sad", 1: "Angry",
};

export default function MoodTracker() {
  const navigate = useNavigate();

  const [selectedMood, setSelectedMood] = useState<MoodKey | null>(() => {
    try {
      const last = localStorage.getItem(LAST_MOOD_KEY) as MoodKey;
      return last && MOOD_CONFIG[last] ? last : null;
    } catch { return null; }
  });

  const [moodLog, setMoodLog] = useState<MoodEntry[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as MoodEntry[]) : [];
    } catch { return []; }
  });

  const cfg = selectedMood ? MOOD_CONFIG[selectedMood] : null;
  const accentColor = cfg?.accent ?? "#8a6dff";

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(moodLog)); } catch {}
  }, [moodLog]);

  const handleSelect = (key: MoodKey) => {
    setSelectedMood(key);
    setMoodLog((prev) => [...prev, { mood: key, timestamp: Date.now() }]);
    try {
      localStorage.setItem(LAST_MOOD_KEY, key);
      const moodToTheme: Record<MoodKey, string> = {
        happy: "energised", calm: "peaceful", sad: "focused",
        anxious: "warm", angry: "energised", neutral: "calm",
      };
      localStorage.setItem("appMood", moodToTheme[key]);
    } catch {}
  };

  // Chart
  const chartW = 560; const chartH = 160;
  const padL = 68; const padR = 16; const padT = 10; const padB = 28;
  const plotW = chartW - padL - padR; const plotH = chartH - padT - padB;
  const visibleLog = moodLog.slice(-20);
  const scoreToY = (s: number) => padT + plotH - ((s - 1) / 5) * plotH;
  const idxToX = (i: number) =>
    visibleLog.length === 1 ? padL + plotW / 2 : padL + (i / (visibleLog.length - 1)) * plotW;
  const points = visibleLog.map((e, i) => `${idxToX(i)},${scoreToY(MOOD_CONFIG[e.mood].moodScore)}`).join(" ");
  const fillPath = visibleLog.length > 1
    ? `M ${idxToX(0)},${scoreToY(MOOD_CONFIG[visibleLog[0].mood].moodScore)} ` +
      visibleLog.slice(1).map((e, i) => `L ${idxToX(i + 1)},${scoreToY(MOOD_CONFIG[e.mood].moodScore)}`).join(" ") +
      ` L ${idxToX(visibleLog.length - 1)},${padT + plotH} L ${padL},${padT + plotH} Z`
    : "";

  return (
    <div className={`flex min-h-screen transition-all duration-700 ${cfg ? `bg-gradient-to-br ${cfg.bg}` : "bg-[#fcfbff]"}`}>
      {cfg && (
        <>
          <div className="pointer-events-none fixed left-[-120px] top-[-80px] h-[380px] w-[380px] rounded-full blur-[100px] opacity-30 transition-all duration-1000" style={{ background: cfg.orb1 }} />
          <div className="pointer-events-none fixed bottom-[-60px] right-[-60px] h-[300px] w-[300px] rounded-full blur-[80px] opacity-20 transition-all duration-1000" style={{ background: cfg.orb2 }} />
        </>
      )}

      <Sidebar />

      <main className="relative flex-1 px-4 py-6 sm:px-8">

        {/* Header */}
        <div className="flex items-center gap-4 mb-5">
          <button onClick={() => navigate("/home")} className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl transition-opacity hover:opacity-80" style={{ background: cfg ? cfg.soft : "#f4efff" }} aria-label="Go back">
            <ArrowLeft size={18} style={{ color: accentColor }} />
          </button>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide transition-colors duration-500" style={{ color: accentColor }}>Mood tracking</p>
            <h1 className="text-3xl font-black text-[#241b43] sm:text-4xl">How are you feeling?</h1>
          </div>
        </div>

        <p className="mb-8 max-w-lg text-sm leading-7 text-[#6d6787]">Track your emotions gently and understand your patterns over time.</p>

        {/* Mood selector card */}
        <div className="rounded-3xl bg-white/80 backdrop-blur-sm p-6 shadow-sm border border-white sm:p-8 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-colors duration-500" style={{ background: cfg ? cfg.iconBg : "#f2ebff" }}>
              <Activity size={22} style={{ color: accentColor }} />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#241b43]">Daily mood check-in</h2>
              <p className="text-sm text-[#8d84ad]">Select the emotion closest to how you feel right now</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {MOOD_KEYS.map((key) => {
              const m = MOOD_CONFIG[key]; const Icon = m.Icon; const isSelected = selectedMood === key;
              return (
                <button key={key} onClick={() => handleSelect(key)} aria-pressed={isSelected}
                  className="flex flex-col items-start rounded-2xl p-5 text-left transition-all duration-300"
                  style={{ background: isSelected ? m.soft : "#faf7ff", border: `1.5px solid ${isSelected ? m.accent : "transparent"}`, boxShadow: isSelected ? `0 0 0 3px ${m.accent}18` : "none", transform: isSelected ? "scale(1.02)" : "scale(1)" }}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl mb-4 transition-colors duration-300" style={{ background: isSelected ? m.accent + "22" : m.iconBg }}>
                    <Icon size={24} style={{ color: m.accent }} />
                  </div>
                  <h3 className="text-base font-black text-[#241b43] mb-1">{m.label}</h3>
                  <p className="text-xs leading-5 text-[#8d84ad]">{m.description}</p>
                </button>
              );
            })}
          </div>

          {cfg && selectedMood && (
            <div className="mt-6 rounded-2xl p-5 flex items-center gap-4 transition-all duration-500" style={{ background: cfg.soft, border: `1.5px solid ${cfg.accent}33` }}>
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl" style={{ background: cfg.iconBg }}>
                <cfg.Icon size={22} style={{ color: cfg.accent }} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide mb-0.5" style={{ color: cfg.accent }}>Mood recorded</p>
                <p className="text-base font-black text-[#241b43]">{cfg.label} — {cfg.description}</p>
              </div>
            </div>
          )}
        </div>

        {/* Graph card */}
        <div className="rounded-3xl bg-white/80 backdrop-blur-sm p-6 shadow-sm border border-white sm:p-8">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide mb-1 transition-colors duration-500" style={{ color: accentColor }}>Mood analytics</p>
              <h2 className="text-xl font-black text-[#241b43]">
                {moodLog.length > 0 ? "Your mood journey" : "Log a mood to start your chart"}
              </h2>
            </div>
            {moodLog.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="rounded-xl px-3 py-1.5 text-xs font-bold" style={{ background: cfg?.soft ?? "#ede9fe", color: accentColor }}>
                  {moodLog.length} log{moodLog.length !== 1 ? "s" : ""}
                </span>
                <button onClick={() => { setMoodLog([]); try { localStorage.removeItem(STORAGE_KEY); } catch {} }}
                  className="rounded-xl px-3 py-1.5 text-xs font-semibold text-[#c4b8e8] hover:text-[#ef4444] transition-colors">
                  Clear
                </button>
              </div>
            )}
          </div>

          {moodLog.length > 0 && <p className="text-sm text-[#8d84ad] mb-6">Each point is a mood you logged — see how you've been feeling</p>}

          {moodLog.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl py-14" style={{ background: "#faf7ff" }}>
              <Activity size={32} className="mb-3 opacity-20" style={{ color: accentColor }} />
              <p className="text-sm text-[#c4b8e8]">Pick a mood above — your chart will appear here</p>
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <svg width="100%" viewBox={`0 0 ${chartW} ${chartH}`} preserveAspectRatio="xMidYMid meet" style={{ minWidth: 320, display: "block" }}>
                <defs>
                  <linearGradient id="moodFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={accentColor} stopOpacity="0.18" />
                    <stop offset="100%" stopColor={accentColor} stopOpacity="0.01" />
                  </linearGradient>
                </defs>
                {[1, 2, 3, 4, 5, 6].map((score) => (
                  <g key={score}>
                    <line x1={padL} y1={scoreToY(score)} x2={chartW - padR} y2={scoreToY(score)} stroke="#f0ecff" strokeWidth="1" />
                    <text x={padL - 8} y={scoreToY(score) + 4} textAnchor="end" fontSize="9" fill="#b0a8d0" fontWeight="600">{Y_LABELS[score]}</text>
                  </g>
                ))}
                {visibleLog.length > 1 && <path d={fillPath} fill="url(#moodFill)" />}
                {visibleLog.length > 1 && <polyline points={points} fill="none" stroke={accentColor} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />}
                {visibleLog.map((entry, i) => {
                  const m = MOOD_CONFIG[entry.mood];
                  const cx = idxToX(i); const cy = scoreToY(m.moodScore); const isLast = i === visibleLog.length - 1;
                  return (
                    <g key={i}>
                      {isLast && <circle cx={cx} cy={cy} r="9" fill={m.accent} opacity="0.15" />}
                      <circle cx={cx} cy={cy} r={isLast ? 5.5 : 4} fill={isLast ? m.accent : "#fff"} stroke={m.accent} strokeWidth="2" />
                      {(i === 0 || isLast || i % 4 === 0) && (
                        <text x={cx} y={chartH - 4} textAnchor="middle" fontSize="8.5" fill="#b0a8d0" fontWeight="500">
                          {visibleLog.length > 8 ? formatDate(entry.timestamp) : formatTime(entry.timestamp)}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
          )}

          {moodLog.length > 0 && (
            <div className="mt-6 border-t border-[#f0ecff] pt-5">
              <p className="text-xs font-bold uppercase tracking-wide text-[#b0a8d0] mb-3">Recent entries</p>
              <div className="flex flex-col gap-2">
                {[...moodLog].reverse().slice(0, 5).map((entry, i) => {
                  const m = MOOD_CONFIG[entry.mood]; const Icon = m.Icon;
                  return (
                    <div key={i} className="flex items-center gap-3 rounded-xl px-3 py-2" style={{ background: m.soft + "66" }}>
                      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg" style={{ background: m.iconBg }}>
                        <Icon size={13} style={{ color: m.accent }} />
                      </div>
                      <span className="text-sm font-bold text-[#241b43]">{m.label}</span>
                      <span className="ml-auto text-xs text-[#b0a8d0]">{formatDate(entry.timestamp)} {formatTime(entry.timestamp)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {moodLog.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-3 border-t border-[#f0ecff] pt-5">
              {MOOD_KEYS.map((key) => {
                const m = MOOD_CONFIG[key]; const Icon = m.Icon;
                return (
                  <button key={key} onClick={() => handleSelect(key)}
                    className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-200"
                    style={{ background: m.soft, color: m.accent, opacity: selectedMood === key ? 1 : 0.4, transform: selectedMood === key ? "scale(1.05)" : "scale(1)" }}>
                    <Icon size={12} />
                    {m.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}