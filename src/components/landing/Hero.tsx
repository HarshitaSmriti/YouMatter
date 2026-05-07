import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-16 cloud-bg overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-lavender-light rounded-full blur-3xl opacity-60 animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky-light rounded-full blur-3xl opacity-50 animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-40 right-1/4 w-48 h-48 bg-blush-light rounded-full blur-3xl opacity-40 animate-float" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-lavender-light/60 text-primary rounded-full px-4 py-1.5 text-sm font-body mb-6">
            <Sparkles className="h-4 w-4" />
            Your emotional wellness companion
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            You matter.{' '}
            <span className="gradient-text">Your feelings matter.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-body max-w-xl mx-auto lg:mx-0 mb-8">
            Meet Aasha — your gentle AI companion for emotional support, mindful journaling, breathing exercises, and understanding your health better.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link to="/auth">
              <Button variant="hero" size="xl">
                <MessageCircle className="h-5 w-5" />
                Talk to Aasha
              </Button>
            </Link>
            <a href="#features">
              <Button variant="glass" size="lg">
                Learn More
              </Button>
            </a>
          </div>
        </div>

        {/* Animated chat mock */}
        <div className="hidden lg:flex justify-center animate-slide-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
          <div className="glass-card-strong rounded-3xl p-6 w-80 space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-lavender-glow flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-heading font-semibold text-sm">Aasha</p>
                <p className="text-xs text-muted-foreground">Your companion</p>
              </div>
            </div>
            <div className="bg-lavender-light/50 rounded-2xl rounded-tl-sm p-3">
              <p className="text-sm font-body">Hey there 💜 How are you feeling today? I'm here to listen.</p>
            </div>
            <div className="bg-sky-light/50 rounded-2xl rounded-tr-sm p-3 ml-8">
              <p className="text-sm font-body">I've been feeling a bit overwhelmed lately...</p>
            </div>
            <div className="bg-lavender-light/50 rounded-2xl rounded-tl-sm p-3">
              <p className="text-sm font-body">That's okay. Let's take a moment to breathe together. Would you like to try a calming exercise? 🌿</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
