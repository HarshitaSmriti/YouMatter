import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔥 GET INITIAL SESSION
    const init = async () => {
      const { data } = await supabase.auth.getSession();

      console.log("INITIAL SESSION:", data.session);

      if (data.session) {
        setUser(data.session.user);
        localStorage.setItem("token", data.session.access_token);
      } else {
        setUser(null);
        localStorage.removeItem("token");
      }

      setLoading(false);
    };

    init();

    // 🔥 LISTEN TO AUTH CHANGES
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("AUTH CHANGE:", session);

      if (session) {
        setUser(session.user);
        localStorage.setItem("token", session.access_token);
      } else {
        setUser(null);
        localStorage.removeItem("token");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // 🔥 SIGN UP
  const signUp = async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    console.log("SIGNUP DATA:", data);
    console.log("SIGNUP ERROR:", error);

    return {
      error: error?.message || null,
      session: data.session,
      needsConfirmation: !data.session,
    };
  };

  // 🔥 SIGN IN
  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("LOGIN DATA:", data);
    console.log("LOGIN ERROR:", error);

    // 🔥 FORCE SAVE TOKEN (important)
    if (data?.session?.access_token) {
      localStorage.setItem("token", data.session.access_token);
    }

    return {
      error: error?.message || null,
      session: data.session,
    };
  };

  // 🔥 SIGN OUT
  const signOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("token");
    setUser(null);
  };

  return { user, loading, signIn, signUp, signOut };
};
