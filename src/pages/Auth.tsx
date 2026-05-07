import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Mail, Lock } from "lucide-react";

const Auth = () => {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (isSignUp) {
        await signUp(email, password);
        alert("Check your email to verify account");
      } else {
        const data = await signIn(email, password);
        if (data?.session) {
          navigate("/dashboard");
        }
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f3ff] via-white to-[#f3f0ff]">

      {/* Card */}
      <div className="w-[420px] bg-white/80 backdrop-blur-xl rounded-[28px] shadow-xl px-8 py-7">

        {/* Back */}
        <button
          onClick={() => navigate("/")}
          className="text-sm text-gray-400 mb-4 flex items-center gap-1"
        >
          ← Back
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">💜</span>
          <span className="text-lg font-semibold text-gray-800">
            YouMatter
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-[26px] font-bold text-gray-900 mb-1">
          {isSignUp ? "Create account" : "Welcome back"}
        </h2>

        <p className="text-sm text-gray-400 mb-6">
          Aasha is glad to see you again 💜
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div className="flex items-center gap-3 bg-[#f5f5f7] px-4 py-3 rounded-full">
            <Mail className="text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent outline-none text-sm w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="flex items-center gap-3 bg-[#f5f5f7] px-4 py-3 rounded-full">
            <Lock className="text-gray-400 w-5 h-5" />
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent outline-none text-sm w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Button */}
          <button
            className="w-full py-3 rounded-full text-white font-medium text-sm
              bg-gradient-to-r from-[#6d28d9] to-[#8b5cf6]
              shadow-md hover:opacity-90 transition"
          >
            {isSignUp ? "Create Account" : "Sign In"}
          </button>

        </form>

        {/* Toggle */}
        <p className="text-center text-sm text-gray-400 mt-5">
          {isSignUp
            ? "Already have an account? "
            : "Don't have an account? "}
          <span
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-purple-600 font-medium cursor-pointer"
          >
            {isSignUp ? "Sign In" : "Create Account"}
          </span>
        </p>

      </div>
    </div>
  );
};

export default Auth;