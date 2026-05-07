const testimonials = [
  { name: "Priya S.", text: "Aasha helped me through my toughest days. It feels like having a caring friend always available.", avatar: "🌸" },
  { name: "Alex M.", text: "The breathing exercises are incredible. I use them every morning before work.", avatar: "🌿" },
  { name: "Jordan L.", text: "Being able to understand my lab reports in simple language took away so much health anxiety.", avatar: "💜" },
];

const Testimonials = () => (
  <section id="testimonials" className="py-24 cloud-bg">
    <div className="container mx-auto px-4">
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-16">
        Stories from our <span className="gradient-text">community</span>
      </h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {testimonials.map((t, i) => (
          <div
            key={t.name}
            className="glass-card-strong rounded-2xl p-6 animate-slide-up"
            style={{ animationDelay: `${i * 100}ms`, opacity: 0 }}
          >
            <div className="text-3xl mb-4">{t.avatar}</div>
            <p className="text-sm text-muted-foreground font-body mb-4 italic">"{t.text}"</p>
            <p className="font-heading font-semibold text-sm">{t.name}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
