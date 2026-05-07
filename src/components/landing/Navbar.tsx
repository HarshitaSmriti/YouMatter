import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card-strong">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-primary fill-primary/30" />
          <span className="font-heading text-xl font-bold text-foreground">YouMatter</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm font-body text-muted-foreground hover:text-primary transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm font-body text-muted-foreground hover:text-primary transition-colors">How It Works</a>
          <a href="#testimonials" className="text-sm font-body text-muted-foreground hover:text-primary transition-colors">Stories</a>
          <Link to="/auth">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden glass-card-strong border-t border-border p-4 flex flex-col gap-3 animate-fade-in">
          <a href="#features" className="text-sm font-body py-2" onClick={() => setOpen(false)}>Features</a>
          <a href="#how-it-works" className="text-sm font-body py-2" onClick={() => setOpen(false)}>How It Works</a>
          <a href="#testimonials" className="text-sm font-body py-2" onClick={() => setOpen(false)}>Stories</a>
          <Link to="/auth" onClick={() => setOpen(false)}>
            <Button className="w-full" size="sm">Get Started</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
