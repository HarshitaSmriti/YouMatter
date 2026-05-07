import { useState, useEffect } from "react";
import { supabase } from "../integrations/supabase/client";

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setUser(data.session?.user ?? null);

      if (data.session?.access_token) {
        localStorage.setItem("token", data.session.access_token);
      }

      setLoading(false);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.access_token) {
          localStorage.setItem("token", session.access_token);
        } else {
          localStorage.removeItem("token");
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;
    return data;
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (data.session?.access_token) {
      localStorage.setItem("token", data.session.access_token);
    }

    return data;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("token");
  };

  return { user, session, loading, signUp, signIn, signOut };
};