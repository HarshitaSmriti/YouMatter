import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import AuthLayout from "../components/AuthLayout";
import supabase from "../config/supabaseClient";

function Login() {
  const [showPassword, setShowPassword] =
    useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const navigate = useNavigate();

  // EMAIL LOGIN
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const { data, error } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (error) {
  alert("Incorrect email or password");
  return;
}

console.log(data);

localStorage.setItem(
  "token",
  data.session.access_token
);

const username =
  data.user.email?.split("@")[0];

localStorage.setItem(
  "userName",
  username || "User"
);

navigate("/home");

  } catch (err) {
    console.log(err);
    alert("Something went wrong");
  } finally {
    setLoading(false);
  }
};

  // GOOGLE LOGIN
const signInWithGoogle = async () => {
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo:
        `${window.location.origin}`,
    },
  });
};

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Login to continue your wellness journey."
    >
      <form
        className="space-y-6"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* EMAIL */}
        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full rounded-2xl border border-gray-200 px-5 py-4 outline-none focus:border-purple-500"
          />
        </div>

        {/* PASSWORD */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="font-medium text-gray-700">
              Password
            </label>

            <Link
              to="/forgot-password"
              className="text-sm text-purple-600 hover:text-purple-700"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="relative">
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full rounded-2xl border border-gray-200 px-5 py-4 pr-14 outline-none focus:border-purple-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600"
            >
              {showPassword ? (
                <EyeOff size={22} />
              ) : (
                <Eye size={22} />
              )}
            </button>
          </div>
        </div>

        {/* REMEMBER */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-3 text-gray-600">
            <input
              type="checkbox"
              className="h-4 w-4 accent-purple-600"
            />

            Remember me
          </label>
        </div>

        {/* LOGIN BUTTON */}
        <button
          type="button"
          onClick={handleLogin}
          disabled={loading}
          className="w-full rounded-2xl bg-purple-600 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-purple-700 disabled:opacity-50"
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

        {/* DIVIDER */}
        <div className="flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-gray-200"></div>

          <span className="text-sm text-gray-400">
            OR
          </span>

          <div className="h-[1px] flex-1 bg-gray-200"></div>
        </div>

        {/* GOOGLE */}
        <button
          type="button"
          onClick={signInWithGoogle}
          className="w-full rounded-2xl border border-gray-200 bg-white py-4 font-semibold text-gray-700 transition-all hover:border-purple-300"
        >
          Continue with Google
        </button>

        {/* SIGNUP */}
        <p className="text-center text-gray-500">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-purple-600"
          >
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default Login;
