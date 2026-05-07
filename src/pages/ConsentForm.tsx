import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import api from "../config/api.ts"; 

import {
  HeartHandshake,
  ShieldCheck,
  Mail,
  User,
  ArrowRight,
} from "lucide-react";

function ConsentForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    guardianName: "",
    guardianEmail: "",
    consent: false,
  });

    const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } =
      e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  try {
    const res = await api.post(
  "/users",
  {
    name: formData.userName,
    email: formData.userEmail,
    guardian_contact:
      formData.guardianEmail,
  }
);

    console.log(res.data);

    localStorage.setItem(
      "consentGiven",
      "true"
    );

    navigate("/home");
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="min-h-screen bg-[#fcfbff] px-4 py-10">
      <div className="mx-auto max-w-[760px]">
        {/* TOP */}
        <div className="rounded-[40px] bg-gradient-to-br from-[#f5efff] via-[#fff8fc] to-[#eef7ff] p-8 sm:p-12">
          <div className="flex h-20 w-20 items-center justify-center rounded-[30px] bg-white shadow-sm">
            <HeartHandshake
              size={38}
              className="text-[#8a6dff]"
            />
          </div>

          <h1 className="mt-8 text-[38px] font-black leading-tight text-[#241b43] sm:text-[54px]">
            Before we begin,
            <br />
            let’s create a safe space together.
          </h1>

          <p className="mt-6 max-w-[620px] text-[17px] leading-8 text-[#6d6787]">
            YouMatter is built to support you gently and
            privately. In difficult moments, having a trusted
            person nearby can make a huge difference.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-[40px] bg-white p-8 shadow-sm sm:p-10"
        >
          {/* USER INFO */}
          <div>
            <p className="text-sm font-semibold text-[#8d84ad]">
              About You
            </p>

            <h2 className="mt-2 text-[30px] font-black text-[#241b43]">
              Tell us a little about yourself
            </h2>

            <div className="mt-8 space-y-5">
              {/* USER NAME */}
              <div>
                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#241b43]">
                  <User
                    size={16}
                    className="text-[#8a6dff]"
                  />
                  Your Name
                </label>

                <input
                  required
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full rounded-3xl border border-[#efe8ff] bg-[#faf7ff] px-5 py-4 text-[#241b43] outline-none transition focus:border-[#8a6dff]"
                />
              </div>

              {/* USER EMAIL */}
              <div>
                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#241b43]">
                  <Mail
                    size={16}
                    className="text-[#8a6dff]"
                  />
                  Your Email
                </label>

                <input
                  type="email"
                  name="userEmail"
                  value={formData.userEmail}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full rounded-3xl border border-[#efe8ff] bg-[#faf7ff] px-5 py-4 text-[#241b43] outline-none transition focus:border-[#8a6dff]"
                />
              </div>
            </div>
          </div>

          {/* GUARDIAN */}
          <div className="mt-12">
            <p className="text-sm font-semibold text-[#8d84ad]">
              Trusted Contact
            </p>

            <h2 className="mt-2 text-[30px] font-black text-[#241b43]">
              Someone who cares about you
            </h2>

            <p className="mt-3 max-w-[600px] text-[15px] leading-7 text-[#6d6787]">
              This can be a parent, guardian, sibling or
              someone you trust deeply.
            </p>

            <div className="mt-8 space-y-5">
              {/* GUARDIAN NAME */}
              <div>
                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#241b43]">
                  <User
                    size={16}
                    className="text-[#ff7fa8]"
                  />
                  Guardian's Name
                </label>

                <input
                  type="text"
                  name="guardianName"
                  value={formData.guardianName}
                  onChange={handleChange}
                  placeholder="Enter guardian's name"
                  className="w-full rounded-3xl border border-[#ffe3ec] bg-[#fff8fb] px-5 py-4 text-[#241b43] outline-none transition focus:border-[#ff7fa8]"
                />
              </div>

              {/* GUARDIAN EMAIL */}
              <div>
                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#241b43]">
                  <Mail
                    size={16}
                    className="text-[#ff7fa8]"
                  />
                  Guardian's Email
                </label>

                <input
                  type="email"
                  name="guardianEmail"
                  value={formData.guardianEmail}
                  onChange={handleChange}
                  placeholder="Enter guardian's email"
                  className="w-full rounded-3xl border border-[#ffe3ec] bg-[#fff8fb] px-5 py-4 text-[#241b43] outline-none transition focus:border-[#ff7fa8]"
                />
              </div>
            </div>
          </div>

          {/* CONSENT */}
          <div className="mt-12 rounded-[32px] bg-[#f8f4ff] p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#ebe0ff]">
                <ShieldCheck
                  size={28}
                  className="text-[#8a6dff]"
                />
              </div>

              <div>
                <h3 className="text-[24px] font-black text-[#241b43]">
                  Your consent matters
                </h3>

                <p className="mt-3 text-[15px] leading-8 text-[#6d6787]">
                  If our system detects signs of serious
                  emotional crisis or possible self-harm,
                  would you allow YouMatter to notify your
                  trusted contact for support?
                </p>

                <label className="mt-6 flex cursor-pointer items-start gap-4">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1 h-5 w-5 accent-[#8a6dff]"
                  />

                  <span className="text-[15px] leading-7 text-[#241b43]">
                    Yes, I consent to YouMatter contacting
                    my trusted guardian during severe crisis
                    situations for my safety and support.
                  </span>
                </label>
              </div>
            </div>
          </div>

                <button
  type="button"
  onClick={async () => {
    try {
      const res = await api.get("/users");

      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }}
  className="mb-6 rounded-xl bg-black px-4 py-2 text-white"
>
  Test Backend
</button> 
          {/* FOOTER */}
          <div className="mt-10 flex flex-col items-center justify-between gap-5 sm:flex-row">
            <p className="max-w-[450px] text-sm leading-7 text-[#8d84ad]">
              Your information stays private and is only
              used to improve your safety and wellbeing.
            </p>

            <button
              type="submit"
              className="flex items-center gap-3 rounded-3xl bg-[#8a6dff] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#7857ff]"
            >
              Continue Safely

              <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ConsentForm;