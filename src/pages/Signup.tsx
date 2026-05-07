import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import AuthLayout from "../components/AuthLayout";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  return (
    <AuthLayout
      title="Create account"
      subtitle="Start your mental wellness journey today."
    >
      <form className="space-y-6">
        {/* NAME */}
        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your name"
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value)
            }
            className="w-full rounded-2xl border border-gray-200 px-5 py-4 outline-none focus:border-purple-500"
          />
        </div>

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
          <label className="mb-2 block font-medium text-gray-700">
            Password
          </label>

          <div className="relative">
            <input
              type={
                showPassword ? "text" : "password"
              }
              placeholder="Create password"
              className="w-full rounded-2xl border border-gray-200 px-5 py-4 pr-14 outline-none focus:border-purple-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
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

        {/* CONFIRM PASSWORD */}
        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Confirm Password
          </label>

          <div className="relative">
            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="Confirm password"
              className="w-full rounded-2xl border border-gray-200 px-5 py-4 pr-14 outline-none focus:border-purple-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600"
            >
              {showConfirmPassword ? (
                <EyeOff size={22} />
              ) : (
                <Eye size={22} />
              )}
            </button>
          </div>
        </div>

        {/* TERMS */}
        <label className="flex items-start gap-3 text-sm leading-relaxed text-gray-600">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 accent-purple-600"
          />

          I agree to the Terms & Conditions and
          Privacy Policy.
        </label>

        {/* BUTTON */}
        <button
          type="button"
          onClick={() => {
            localStorage.setItem(
              "userName",
              fullName
            );

            localStorage.setItem(
              "userEmail",
              email
            );

            navigate("/consent");
          }}
          className="w-full rounded-2xl bg-purple-600 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-purple-700"
        >
          Create Account
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
          className="w-full rounded-2xl border border-gray-200 bg-white py-4 font-semibold text-gray-700 transition-all hover:border-purple-300"
        >
          Continue with Google
        </button>

        {/* LOGIN */}
        <p className="text-center text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-purple-600"
          >
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default Signup;