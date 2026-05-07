import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { User, Shield, Phone, Heart, LogOut } from "lucide-react";

const Profile = () => {
  const { user, signOut } = useAuth();
  const name = user?.user_metadata?.full_name || "User";
  const email = user?.email || "";
  const joinDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : '';

  return (
    <div className="space-y-6 animate-fade-in max-w-lg mx-auto">
      <h1 className="font-heading text-2xl font-bold">Profile</h1>

      <div className="glass-card-strong rounded-2xl p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-lavender-glow flex items-center justify-center mx-auto mb-4">
          <User className="h-8 w-8 text-primary-foreground" />
        </div>
        <h2 className="font-heading text-xl font-bold">{name}</h2>
        <p className="text-sm text-muted-foreground font-body">{email}</p>
        {joinDate && <p className="text-xs text-muted-foreground font-body mt-1">Member since {joinDate}</p>}
      </div>

      <div className="glass-card rounded-2xl p-5 flex items-start gap-3">
        <Shield className="h-5 w-5 text-primary mt-0.5" />
        <div>
          <h3 className="font-heading font-semibold text-sm">Your data is private</h3>
          <p className="text-xs text-muted-foreground font-body mt-1">
            All conversations and journal entries are encrypted and never shared. You're always in control.
          </p>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-5 flex items-start gap-3">
        <Heart className="h-5 w-5 text-blush mt-0.5" />
        <div>
          <h3 className="font-heading font-semibold text-sm">Not a substitute for therapy</h3>
          <p className="text-xs text-muted-foreground font-body mt-1">
            YouMatter provides emotional support, not medical advice. If you're in crisis, please reach out to a professional.
          </p>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-5">
        <h3 className="font-heading font-semibold text-sm mb-3 flex items-center gap-2">
          <Phone className="h-4 w-4 text-destructive" /> Crisis Resources
        </h3>
        <div className="space-y-2 text-sm font-body">
          <p><strong>988 Suicide & Crisis Lifeline:</strong> Call or text 988</p>
          <p><strong>Crisis Text Line:</strong> Text HOME to 741741</p>
          <p><strong>Emergency:</strong> Call 911</p>
        </div>
      </div>

      <Button variant="ghost" className="w-full text-muted-foreground" onClick={signOut}>
        <LogOut className="h-4 w-4" /> Sign Out
      </Button>
    </div>
  );
};

export default Profile;
