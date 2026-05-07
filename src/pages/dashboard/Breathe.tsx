import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { BREATHING_TECHNIQUES } from "@/types";
import type { BreathingTechnique } from "@/types";
import { Play, Pause, RotateCcw } from "lucide-react";

type Phase = 'idle' | 'inhale' | 'hold' | 'exhale' | 'holdAfter';

const Breathe = () => {
  const [technique, setTechnique] = useState<BreathingTechnique>(BREATHING_TECHNIQUES[0]);
  const [phase, setPhase] = useState<Phase>('idle');
  const [count, setCount] = useState(0);
  const [round, setRound] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const phaseLabel = phase === 'idle' ? 'Ready' : phase === 'inhale' ? 'Breathe In' : phase === 'hold' || phase === 'holdAfter' ? 'Hold' : 'Breathe Out';

  const circleScale = phase === 'inhale' ? 1 : phase === 'exhale' ? 0.6 : phase === 'hold' || phase === 'holdAfter' ? (phase === 'hold' ? 1 : 0.6) : 0.8;

  const nextPhase = useCallback(() => {
    setPhase(prev => {
      if (prev === 'inhale') return 'hold';
      if (prev === 'hold') return 'exhale';
      if (prev === 'exhale') {
        if (technique.holdAfter) return 'holdAfter';
        setRound(r => r + 1);
        return 'inhale';
      }
      if (prev === 'holdAfter') {
        setRound(r => r + 1);
        return 'inhale';
      }
      return 'inhale';
    });
  }, [technique]);

  const getPhaseDuration = useCallback((p: Phase) => {
    switch (p) {
      case 'inhale': return technique.inhale;
      case 'hold': return technique.hold;
      case 'exhale': return technique.exhale;
      case 'holdAfter': return technique.holdAfter || 0;
      default: return 0;
    }
  }, [technique]);

  useEffect(() => {
    if (!running || phase === 'idle') return;
    if (round >= technique.rounds) {
      setRunning(false);
      setPhase('idle');
      setRound(0);
      return;
    }

    const duration = getPhaseDuration(phase);
    setCount(duration);

    intervalRef.current = window.setInterval(() => {
      setCount(c => {
        if (c <= 1) {
          nextPhase();
          return 0;
        }
        return c - 1;
      });
    }, 1000);

    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [phase, running, round, technique, nextPhase, getPhaseDuration]);

  const start = () => {
    setRunning(true);
    setPhase('inhale');
    setRound(0);
  };

  const pause = () => {
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const reset = () => {
    setRunning(false);
    setPhase('idle');
    setCount(0);
    setRound(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-heading text-2xl font-bold">Breathe</h1>
        <p className="text-sm text-muted-foreground font-body">Find your calm with guided breathing 🌿</p>
      </div>

      {/* Technique tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {BREATHING_TECHNIQUES.map(t => (
          <button
            key={t.id}
            onClick={() => { if (!running) setTechnique(t); }}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-body transition-all ${
              technique.id === t.id
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* Breathing circle */}
      <div className="flex flex-col items-center py-8">
        <div className="relative w-56 h-56 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="hsl(var(--lavender-light))"
              strokeWidth="3"
            />
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="hsl(var(--lavender) / 0.1)"
              stroke="hsl(var(--lavender))"
              strokeWidth="3"
              style={{
                transform: `scale(${circleScale})`,
                transformOrigin: 'center',
                transition: `transform ${phase === 'inhale' ? technique.inhale : phase === 'exhale' ? technique.exhale : 0.3}s ease-in-out`,
              }}
            />
          </svg>
          <div className="text-center z-10">
            <p className="font-heading text-lg font-semibold">{phaseLabel}</p>
            {running && <p className="text-3xl font-heading font-bold text-primary mt-1">{count}</p>}
            {running && <p className="text-xs text-muted-foreground font-body mt-1">Round {round + 1}/{technique.rounds}</p>}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3">
        {!running ? (
          <Button variant="hero" size="lg" onClick={start}>
            <Play className="h-5 w-5" /> Start
          </Button>
        ) : (
          <Button variant="secondary" size="lg" onClick={pause}>
            <Pause className="h-5 w-5" /> Pause
          </Button>
        )}
        <Button variant="ghost" size="icon" onClick={reset} aria-label="Reset">
          <RotateCcw className="h-5 w-5" />
        </Button>
      </div>

      {/* Info */}
      <div className="glass-card rounded-2xl p-5 text-center">
        <h3 className="font-heading font-semibold text-sm mb-1">{technique.name}</h3>
        <p className="text-xs text-muted-foreground font-body">{technique.description}</p>
        <p className="text-xs text-muted-foreground font-body mt-1">
          {technique.inhale}s in • {technique.hold}s hold • {technique.exhale}s out
          {technique.holdAfter ? ` • ${technique.holdAfter}s hold` : ''}
          {' '}• {technique.rounds} rounds
        </p>
      </div>
    </div>
  );
};

export default Breathe;
