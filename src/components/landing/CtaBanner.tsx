import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const CtaBanner = () => (
  <section className="py-24">
    <div className="container mx-auto px-4">
      <div className="bg-gradient-to-r from-primary/10 via-sky-light/50 to-blush-light/50 rounded-3xl p-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />
        <div className="relative z-10">
          <Heart className="h-10 w-10 text-primary mx-auto mb-4 animate-pulse-soft" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            You deserve to feel better
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto mb-8">
            Take the first step today. Aasha is ready to listen.
          </p>
          <Link to="/auth">
            <Button variant="hero" size="xl">Start Your Journey</Button>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default CtaBanner;
