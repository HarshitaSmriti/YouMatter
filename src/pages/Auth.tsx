import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      const { data } = await supabase.auth.getSession();

      if (!isMounted) return;

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

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;

      if (session) {
        setUser(session.user);
        localStorage.setItem("token", session.access_token);
      } else {
        setUser(null);
        localStorage.removeItem("token");
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

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

    return {
      error: error?.message || null,
      session: data.session,
      needsConfirmation: !data.session,
    };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // immediate token store (extra safety)
    if (data?.session?.access_token) {
      localStorage.setItem("token", data.session.access_token);
    }

    return {
      error: error?.message || null,
      session: data.session,
    };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("token");
    setUser(null);
  };

  return { user, loading, signIn, signUp, signOut };
};
