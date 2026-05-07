import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

    //   const { data, error } = code
    //     ? await supabase.auth.exchangeCodeForSession(code)
    //     : await supabase.auth.getSession();

    console.log("CODE:", code);

const { data, error } = code
  ? await supabase.auth.exchangeCodeForSession(code)
  : await supabase.auth.getSession();

console.log("DATA:", data);
console.log("ERROR:", error);

      if (error) {
        console.error("Authentication callback failed:", error.message);
        navigate("/login", { replace: true });
        return;
      }

      const session =
        "session" in data
          ? data.session
          : null;

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
        console.log("SESSION FOUND");        
        navigate("/home", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return <p>Loading...</p>;
}

export default AuthCallback;
