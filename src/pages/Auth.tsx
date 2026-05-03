import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // get current session
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null);

      // store token if exists
      if (data.session?.access_token) {
        localStorage.setItem("token", data.session.access_token);
      }

      setLoading(false);
    });

    // listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);

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

  //  SIGN UP
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

  //  SIGN IN
  const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log("LOGIN RESPONSE:", data); //  DEBUG

  //  FORCE SAVE TOKEN HERE
  if (data?.session?.access_token) {
    localStorage.setItem("token", data.session.access_token);
  }

  return {
    error: error?.message || null,
    session: data.session,
  };
};

  //  SIGN OUT
  const signOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("token");
  };

  return { user, loading, signIn, signUp, signOut };
};
