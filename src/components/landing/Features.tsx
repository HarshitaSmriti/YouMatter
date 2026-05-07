import { MessageCircle, BookOpen, Wind, Activity, Brain, FileText } from "lucide-react";

const features = [
  { icon: MessageCircle, title: "Chat with Aasha", desc: "Compassionate AI conversations whenever you need support.", color: "bg-lavender-light text-primary" },
  { icon: BookOpen, title: "Mindful Journal", desc: "Express your thoughts with mood-tagged entries.", color: "bg-sky-light text-sky" },
  { icon: Wind, title: "Breathing Exercises", desc: "Guided techniques to calm your mind and body.", color: "bg-aqua-light text-aqua" },
  { icon: Activity, title: "Mood Tracking", desc: "Visualize emotional patterns and celebrate growth.", color: "bg-blush-light text-blush" },
  { icon: Brain, title: "AI Insights", desc: "Gentle, personalized insights for your wellness journey.", color: "bg-warm-light text-warm" },
  { icon: FileText, title: "Lab Reports", desc: "Upload and understand your health reports in plain language.", color: "bg-success-light text-success" },
];

const Features = () => {
  return (
    <section id="features" className="py-24 cloud-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Everything you need for your <span className="gradient-text">emotional wellness</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto">
            A holistic approach to mental health, combining AI support with proven mindfulness techniques.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="glass-card rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up"
              style={{ animationDelay: `${i * 100}ms`, opacity: 0 }}
            >
              <div className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center mb-4`}>
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground font-body">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
