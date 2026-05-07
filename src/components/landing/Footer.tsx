import { Heart, Phone } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-12 bg-muted/30">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Heart className="h-5 w-5 text-primary fill-primary/30" />
            <span className="font-heading text-lg font-bold">YouMatter</span>
          </div>
          <p className="text-sm text-muted-foreground font-body">
            Your emotional wellness companion. Because you matter, always.
          </p>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-3">Quick Links</h4>
          <div className="space-y-2 text-sm text-muted-foreground font-body">
            <a href="#features" className="block hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="block hover:text-primary transition-colors">How It Works</a>
            <a href="#testimonials" className="block hover:text-primary transition-colors">Stories</a>
          </div>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-3">Crisis Support</h4>
          <div className="glass-card rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm font-body">
              <Phone className="h-4 w-4 text-destructive" />
              <span className="font-semibold">Emergency:</span> 988 Suicide & Crisis Lifeline
            </div>
            <p className="text-xs text-muted-foreground font-body">
              If you are in immediate danger, please call emergency services or the crisis hotline above.
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-border pt-6 text-center text-xs text-muted-foreground font-body">
        © {new Date().getFullYear()} YouMatter. This app provides emotional support, not medical advice.
      </div>
    </div>
  </footer>
);

export default Footer;
