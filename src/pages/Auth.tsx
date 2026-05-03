import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Mail, Lock, User, Loader2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Auth = () => {
  const { user, loading, signIn, signUp } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmationSent, setConfirmationSent] = useState(false);

  if (loading) return (
    <div className="min-h-screen cloud-bg flex items-center justify-center">
      <Loader2 className="h-8 w-8 text-primary animate-spin" />
    </div>
  );

  if (user) return <Navigate to="/dashboard" replace />;

  if (confirmationSent) return (
    <div className="min-h-screen cloud-bg flex items-center justify-center p-4">
      <div className="glass-card-strong rounded-3xl p-8 max-w-md w-full text-center animate-fade-in">
        <div className="text-5xl mb-4">✉️</div>
        <h2 className="font-heading text-2xl font-bold mb-2">Check your email</h2>
        <p className="text-muted-foreground font-body text-sm mb-6">
          We've sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.
        </p>
        <Button variant="ghost" onClick={() => { setConfirmationSent(false); setIsSignUp(false); }}>
          Back to Sign In
        </Button>
      </div>
    </div>
  );

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(null);

  if (isSignUp && password !== confirmPassword) {
    setError("Passwords don't match");
    return;
  }

  setSubmitting(true);

  try {
    if (isSignUp) {
      const result = await signUp(email, password, fullName);

      if (result.error) {
        setError(result.error);
      } else if (result.needsConfirmation) {
        setConfirmationSent(true);
      } else if (result.session) {
        // SAVE TOKEN HERE
        localStorage.setItem("token", result.session.access_token);
      }

    } else {
      const result = await signIn(email, password);

      if (result.error) {
        setError(result.error);
      } else if (result.session) {
        //   TOKEN SAVED HERE
        localStorage.setItem("token", result.session.access_token);
      }
    }
  } catch (err: any) {
    setError(err.message || "Something went wrong");
  }

  setSubmitting(false);
};

  return (
    <div className="min-h-screen cloud-bg flex items-center justify-center p-4 relative">
      <div className="absolute top-20 left-10 w-72 h-72 bg-lavender-light rounded-full blur-3xl opacity-40 animate-float" />
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-sky-light rounded-full blur-3xl opacity-40 animate-float" style={{ animationDelay: '1s' }} />

      <div className="glass-card-strong rounded-3xl p-8 max-w-md w-full relative z-10 animate-fade-in">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6 font-body">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <div className="flex items-center gap-2 mb-6">
          <Heart className="h-6 w-6 text-primary fill-primary/30" />
          <span className="font-heading text-xl font-bold">YouMatter</span>
        </div>

        <h1 className="font-heading text-2xl font-bold mb-1">
          {isSignUp ? "Create your safe space" : "Welcome back"}
        </h1>
        <p className="text-sm text-muted-foreground font-body mb-6">
          {isSignUp ? "Join thousands finding peace with Aasha" : "Aasha is glad to see you again 💜"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Full name"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="pl-10 rounded-xl"
                required
              />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="pl-10 rounded-xl"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="pl-10 rounded-xl"
              minLength={6}
              required
            />
          </div>
          {isSignUp && (
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="pl-10 rounded-xl"
                minLength={6}
                required
              />
            </div>
          )}

          {error && (
            <p className="text-sm text-destructive font-body bg-destructive/10 rounded-xl p-3">{error}</p>
          )}

          <Button type="submit" variant="hero" className="w-full" size="lg" disabled={submitting}>
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : isSignUp ? "Create Account" : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground font-body mt-6">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => { setIsSignUp(!isSignUp); setError(null); }}
            className="text-primary font-semibold hover:underline"
          >
            {isSignUp ? "Sign In" : "Create Account"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
