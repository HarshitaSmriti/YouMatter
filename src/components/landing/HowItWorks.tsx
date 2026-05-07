import { UserPlus, MessageCircle, TrendingUp } from "lucide-react";

const steps = [
  { icon: UserPlus, title: "Create Your Space", desc: "Sign up in seconds and set up your private, safe environment." },
  { icon: MessageCircle, title: "Talk to Aasha", desc: "Share how you're feeling. Aasha listens without judgment." },
  { icon: TrendingUp, title: "Grow & Heal", desc: "Track your moods, journal, and watch your emotional wellness bloom." },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-24 bg-gradient-to-b from-background to-lavender-light/30">
    <div className="container mx-auto px-4">
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-16">
        Three steps to feeling <span className="gradient-text">better</span>
      </h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {steps.map((s, i) => (
          <div key={s.title} className="text-center animate-slide-up" style={{ animationDelay: `${i * 150}ms`, opacity: 0 }}>
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-lavender-glow flex items-center justify-center mx-auto mb-4 text-primary-foreground">
              <s.icon className="h-7 w-7" />
            </div>
            <div className="text-sm font-body text-muted-foreground mb-2">Step {i + 1}</div>
            <h3 className="font-heading text-xl font-semibold mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground font-body">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
