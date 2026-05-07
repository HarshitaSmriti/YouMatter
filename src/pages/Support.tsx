import Sidebar from "../components/Sidebar";

import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Phone,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Mail,
  MessageCircleHeart,
  MoonStar,
} from "lucide-react";

function Support() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-[#fcfbff]">
      <Sidebar />

      <main className="flex-1 px-4 py-6 sm:px-8">
        {/* HEADER */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/home")}
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f4efff]"
          >
            <ArrowLeft
              size={20}
              className="text-[#8a6dff]"
            />
          </button>

          <div>
            <p className="text-sm font-semibold text-[#8d84ad]">
              Emotional Support Space
            </p>

            <h1 className="mt-1 text-[38px] font-black text-[#241b43] sm:text-[52px]">
              You Are Not Alone
            </h1>
          </div>
        </div>

        {/* HERO */}
        <div className="relative mt-10 overflow-hidden rounded-[40px] bg-gradient-to-br from-[#f2ebff] via-[#fdf7ff] to-[#eef5ff] p-8 sm:p-12">
          <div className="absolute left-10 top-10 h-52 w-52 rounded-full bg-[#d9c6ff] opacity-40 blur-3xl" />

          <div className="absolute bottom-0 right-0 h-60 w-60 rounded-full bg-[#bfe8ff] opacity-40 blur-3xl" />

          <div className="relative z-10 max-w-[800px]">
            <div className="flex h-20 w-20 items-center justify-center rounded-[28px] bg-white shadow-sm">
              <HeartHandshake
                size={40}
                className="text-[#8a6dff]"
              />
            </div>

            <h2 className="mt-8 text-[42px] font-black leading-tight text-[#241b43] sm:text-[58px]">
              A gentle space for difficult moments
            </h2>

            <p className="mt-6 max-w-[650px] text-[17px] leading-8 text-[#6d6787]">
              Support isn’t weakness. Sometimes we just
              need someone to listen, guide and remind us
              that healing takes time.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="rounded-2xl bg-[#8a6dff] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#7857ff]">
                Talk To Someone
              </button>

              <button className="rounded-2xl bg-white px-6 py-4 text-sm font-bold text-[#241b43] shadow-sm transition hover:shadow-md">
                Crisis Resources
              </button>
            </div>
          </div>
        </div>

        {/* SUPPORT OPTIONS */}
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {/* CARD 1 */}
          <div className="rounded-[36px] bg-white p-7 shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f2ebff]">
              <Phone
                size={30}
                className="text-[#8a6dff]"
              />
            </div>

            <h3 className="mt-6 text-[30px] font-black text-[#241b43]">
              Emergency Help
            </h3>

            <p className="mt-4 text-[15px] leading-8 text-[#6d6787]">
              If things feel overwhelming, connect to
              immediate support and trusted emergency
              contacts.
            </p>

            <button className="mt-8 rounded-2xl bg-[#8a6dff] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#7857ff]">
              Get Help
            </button>
          </div>

          {/* CARD 2 */}
          <div className="rounded-[36px] bg-white p-7 shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fff1f6]">
              <MessageCircleHeart
                size={30}
                className="text-[#ff7fa8]"
              />
            </div>

            <h3 className="mt-6 text-[30px] font-black text-[#241b43]">
              Safe Conversations
            </h3>

            <p className="mt-4 text-[15px] leading-8 text-[#6d6787]">
              Reach out privately and express your feelings
              without fear of judgment.
            </p>

            <button className="mt-8 rounded-2xl bg-[#ff7fa8] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#ff6796]">
              Start Talking
            </button>
          </div>

          {/* CARD 3 */}
          <div className="rounded-[36px] bg-white p-7 shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eefaf5]">
              <ShieldCheck
                size={30}
                className="text-[#39b8a3]"
              />
            </div>

            <h3 className="mt-6 text-[30px] font-black text-[#241b43]">
              Private & Secure
            </h3>

            <p className="mt-4 text-[15px] leading-8 text-[#6d6787]">
              Your emotions, reflections and support
              sessions stay protected and confidential.
            </p>

            <button className="mt-8 rounded-2xl bg-[#39b8a3] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#28a08d]">
              Learn More
            </button>
          </div>
        </div>

        {/* SELF CARE SECTION */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* LEFT */}
          <div className="rounded-[36px] bg-[#f8f4ff] p-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e8ddff]">
              <MoonStar
                size={30}
                className="text-[#8a6dff]"
              />
            </div>

            <h3 className="mt-6 text-[34px] font-black text-[#241b43]">
              Tonight’s Reminder
            </h3>

            <p className="mt-5 text-[16px] leading-9 text-[#6d6787]">
              Rest is productive.
              <br />
              Healing is not linear.
              <br />
              You are allowed to pause.
              <br />
              Small progress still matters.
            </p>
          </div>

          {/* RIGHT */}
          <div className="rounded-[36px] bg-[#eef5ff] p-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#dbeaff]">
              <Mail
                size={30}
                className="text-[#6ea8fe]"
              />
            </div>

            <h3 className="mt-6 text-[34px] font-black text-[#241b43]">
              Reach Out
            </h3>

            <p className="mt-5 text-[16px] leading-8 text-[#6d6787]">
              Save a trusted person you can contact whenever
              things feel emotionally overwhelming.
            </p>

            <div className="mt-8 rounded-3xl bg-white p-5">
              <p className="text-sm font-semibold text-[#8d84ad]">
                Trusted Contact
              </p>

              <h4 className="mt-2 text-[22px] font-black text-[#241b43]">
                Someone who makes you feel safe
              </h4>

              <div className="mt-6 space-y-4">
                <input
                  type="text"
                  placeholder="Enter name"
                  className="w-full rounded-2xl border border-[#dbeaff] bg-[#f8fbff] px-5 py-4 text-[#241b43] outline-none placeholder:text-[#9a92b5]"
                />

                <input
                  type="tel"
                  placeholder="Enter phone number"
                  className="w-full rounded-2xl border border-[#dbeaff] bg-[#f8fbff] px-5 py-4 text-[#241b43] outline-none placeholder:text-[#9a92b5]"
                />

                <a
                  href="tel:+911234567890"
                  className="flex w-full items-center justify-center rounded-2xl bg-[#6ea8fe] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#5a95f5]"
                >
                  Call Trusted Person
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER MESSAGE */}
        <div className="mt-10 rounded-[36px] bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[28px] bg-[#f2ebff]">
            <Sparkles
              size={36}
              className="text-[#8a6dff]"
            />
          </div>

          <h2 className="mt-8 text-[40px] font-black text-[#241b43]">
            One step at a time
          </h2>

          <p className="mx-auto mt-5 max-w-[700px] text-[16px] leading-8 text-[#6d6787]">
            You don’t need to have everything figured out
            today. Breathe slowly, take care of yourself
            gently and keep moving forward little by
            little.
          </p>
        </div>
      </main>
    </div>
  );
}

export default Support;