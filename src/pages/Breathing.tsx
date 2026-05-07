import { useState } from "react";

import Sidebar from "../components/Sidebar";

import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Wind,
  Waves,
  Orbit,
  Flower2,
  Sparkles,
  CircleDot,
} from "lucide-react";

function Breathing() {
  const navigate = useNavigate();

  const [activeExercise, setActiveExercise] =
    useState(0);

  const exercises = [
    {
      title: "Calm Breath",
      description:
        "Follow the breathing circle and inhale slowly.",
      color: "bg-[#e7faf4]",
      iconBg: "bg-[#cff5ea]",

      icon: (
        <Wind
          size={28}
          className="text-[#39b8a3]"
        />
      ),

      animation: (
        <div className="flex items-center justify-center py-10">
          <div className="flex h-40 w-40 animate-pulse items-center justify-center rounded-full bg-[#b8f0df]">
            <div className="h-24 w-24 rounded-full bg-[#39b8a3]" />
          </div>
        </div>
      ),
    },

    {
      title: "Ocean Waves",

      description:
        "Relax while the waves move smoothly.",

      color: "bg-[#eef5ff]",

      iconBg: "bg-[#dbeaff]",

      icon: (
        <Waves
          size={28}
          className="text-[#6ea8fe]"
        />
      ),

      animation: (
        <div className="flex items-end justify-center gap-3 py-12">
          <div className="h-20 w-6 animate-bounce rounded-full bg-[#6ea8fe]" />

          <div className="h-32 w-6 animate-bounce rounded-full bg-[#8a6dff] [animation-delay:0.2s]" />

          <div className="h-24 w-6 animate-bounce rounded-full bg-[#39b8a3] [animation-delay:0.4s]" />

          <div className="h-36 w-6 animate-bounce rounded-full bg-[#6ea8fe] [animation-delay:0.6s]" />
        </div>
      ),
    },

    {
  title: "Focus Orbit",

  description:
    "Watch the orbit and slow your thoughts.",

  color: "bg-[#f4ecff]",

  iconBg: "bg-[#e6d7ff]",

  icon: (
    <Orbit
      size={28}
      className="text-[#9b6dff]"
    />
  ),

  animation: (
    <div className="flex items-center justify-center py-10">
      <div className="relative flex h-52 w-52 items-center justify-center">
        {/* CENTER */}
        <div className="absolute h-20 w-20 rounded-full bg-[#f2ebff]" />

        {/* ORBIT RING */}
        <div className="absolute h-44 w-44 rounded-full border-2 border-dashed border-[#d8c6ff]" />

        {/* MOVING DOT */}
        <div className="absolute h-44 w-44 animate-spin">
          <div className="absolute left-1/2 top-0 h-6 w-6 -translate-x-1/2 rounded-full bg-[#8a6dff]" />
        </div>
      </div>
    </div>
  ),
},

    {
  title: "Bloom Mind",

  description:
    "Watch the flower bloom calmly.",

  color: "bg-[#fff1f6]",

  iconBg: "bg-[#ffdbe7]",

  icon: (
    <Flower2
      size={28}
      className="text-[#ff7fa8]"
    />
  ),

  animation: (
  <div className="flex items-center justify-center py-10">
    <div className="relative flex h-56 w-56 items-center justify-center">
      {/* PETAL 1 */}
      <div className="absolute h-24 w-24 animate-pulse rounded-full bg-[#ffc4d8] opacity-80 -top-2" />

      {/* PETAL 2 */}
      <div className="absolute h-24 w-24 animate-pulse rounded-full bg-[#ffb1cc] opacity-80 -bottom-2" />

      {/* PETAL 3 */}
      <div className="absolute h-24 w-24 animate-pulse rounded-full bg-[#ffd6e5] opacity-80 -left-2" />

      {/* PETAL 4 */}
      <div className="absolute h-24 w-24 animate-pulse rounded-full bg-[#ffc4d8] opacity-80 -right-2" />

      {/* PETAL 5 */}
      <div className="absolute h-24 w-24 animate-pulse rounded-full bg-[#ffcade] opacity-70 rotate-45" />

      {/* PETAL 6 */}
      <div className="absolute h-24 w-24 animate-pulse rounded-full bg-[#ffd6e5] opacity-70 -rotate-45" />

      {/* CENTER */}
      <div className="relative z-10 h-20 w-20 animate-pulse rounded-full bg-[#ff7fa8]" />
    </div>
  </div>
),
},

    {
      title: "Floating Dots",

      description:
        "Follow the moving dots and breathe slowly.",

      color: "bg-[#fff8ef]",

      iconBg: "bg-[#ffe8c9]",

      icon: (
        <CircleDot
          size={28}
          className="text-[#ffb84d]"
        />
      ),

      animation: (
        <div className="flex items-center justify-center gap-5 py-14">
          <div className="h-8 w-8 animate-bounce rounded-full bg-[#8a6dff]" />

          <div className="h-8 w-8 animate-bounce rounded-full bg-[#39b8a3] [animation-delay:0.2s]" />

          <div className="h-8 w-8 animate-bounce rounded-full bg-[#6ea8fe] [animation-delay:0.4s]" />

          <div className="h-8 w-8 animate-bounce rounded-full bg-[#ff7fa8] [animation-delay:0.6s]" />
        </div>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#fcfbff]">
      <Sidebar />

      <main className="flex-1 px-4 py-6 sm:px-8">
        {/* HEADER */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/home")}
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f4efff] transition hover:bg-[#ece3ff]"
          >
            <ArrowLeft
              size={20}
              className="text-[#8a6dff]"
            />
          </button>

          <div>
            <p className="text-sm font-semibold text-[#8d84ad]">
              Calm Activities
            </p>

            <h1 className="mt-1 text-[38px] font-black text-[#241b43] sm:text-[52px]">
              Breathing Exercises
            </h1>
          </div>
        </div>

        <p className="mt-5 max-w-[700px] text-[16px] leading-8 text-[#6d6787]">
          Slow down your thoughts, relax your body and
          calm your breathing with gentle interactive
          exercises.
        </p>

        {/* GRID */}
        <div className="mt-10 grid gap-5 lg:grid-cols-5">
          {exercises.map((exercise, index) => (
            <button
              key={index}
              onClick={() =>
                setActiveExercise(index)
              }
              className={`rounded-[28px] border-2 p-5 text-left transition-all ${
                activeExercise === index
                  ? "border-[#8a6dff] bg-[#f7f3ff]"
                  : "border-transparent bg-white"
              }`}
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${exercise.iconBg}`}
              >
                {exercise.icon}
              </div>

              <h3 className="mt-5 text-[22px] font-black text-[#241b43]">
                {exercise.title}
              </h3>

              <p className="mt-2 text-sm leading-7 text-[#8d84ad]">
                {exercise.description}
              </p>
            </button>
          ))}
        </div>

        {/* ACTIVE */}
        <div
          className={`mt-10 rounded-[36px] p-8 shadow-sm ${exercises[activeExercise].color}`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-2xl ${exercises[activeExercise].iconBg}`}
            >
              {exercises[activeExercise].icon}
            </div>

            <div>
              <h2 className="text-[34px] font-black text-[#241b43]">
                {exercises[activeExercise].title}
              </h2>

              <p className="mt-2 text-[15px] leading-7 text-[#6d6787]">
                {
                  exercises[activeExercise]
                    .description
                }
              </p>
            </div>
          </div>

          {exercises[activeExercise].animation}

          <div className="mt-4 rounded-[28px] bg-white/70 p-5">
            <div className="flex items-center gap-3">
              <Sparkles
                size={20}
                className="text-[#8a6dff]"
              />

              <p className="text-[15px] leading-7 text-[#6d6787]">
                Inhale slowly for 4 seconds, hold
                for 4 seconds and exhale gently for
                6 seconds.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Breathing;