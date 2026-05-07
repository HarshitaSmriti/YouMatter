import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        localStorage.setItem(
          "token",
          session.access_token
        );

        const username =
          session.user.email?.split("@")[0];

        localStorage.setItem(
          "userName",
          username || "User"
        );

        navigate("/home");
      }
    };

    getSession();
  }, [navigate]);

  return <p>Loading...</p>;
}

export default AuthCallback;