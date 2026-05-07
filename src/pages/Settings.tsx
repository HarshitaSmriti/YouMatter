import { useState } from "react";

import Sidebar from "../components/Sidebar";

import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Bell,
  Moon,
  Shield,
  Volume2,
  User,
  Heart,
  Lock,
  Smartphone,
} from "lucide-react";

function Settings() {
  const navigate = useNavigate();

  const [notifications, setNotifications] =
    useState(true);

  const [sound, setSound] =
    useState(true);

  const [darkMode, setDarkMode] =
    useState(false);

    const toggleDarkMode = () => {
  const newMode = !darkMode;

  setDarkMode(newMode);

  if (newMode) {
    document.documentElement.classList.add(
      "dark"
    );

    localStorage.setItem(
      "theme",
      "dark"
    );
  } else {
    document.documentElement.classList.remove(
      "dark"
    );

    localStorage.setItem(
      "theme",
      "light"
    );
  }
};

  const [calmReminders, setCalmReminders] =
    useState(true);

  return (
  <div className="flex min-h-screen bg-[#fcfbff] dark:bg-[#0f172a]">
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
              Preferences & Privacy
            </p>

            <h1 className="mt-1 text-[38px] font-black text-[#241b43] dark:text-white sm:text-[52px]">
              Settings
            </h1>
          </div>
        </div>

        {/* PROFILE */}
        <div className="mt-10 rounded-[40px] bg-gradient-to-br from-[#f2ebff] via-[#faf7ff] to-[#eef5ff] p-8 dark:from-[#1e293b] dark:via-[#0f172a] dark:to-[#111827]">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-sm">
              <User
                size={48}
                className="text-[#8a6dff]"
              />
            </div>

            <div>
              <h2 className="text-[40px] font-black text-[#241b43]">
                Harshita
              </h2>

              <p className="mt-2 text-[16px] text-[#6d6787]">
                Your safe mental wellness journey
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <button className="rounded-2xl bg-[#8a6dff] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#7857ff]">
                  Edit Profile
                </button>

                <button className="rounded-2xl bg-white px-5 py-3 text-sm font-bold text-[#241b43] shadow-sm transition hover:shadow-md">
                  Account Security
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SETTINGS GRID */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* NOTIFICATIONS */}
          <div className="rounded-[36px] bg-white p-7 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f2ebff]">
                <Bell
                  size={30}
                  className="text-[#8a6dff]"
                />
              </div>

              <div>
                <h3 className="text-[28px] font-black text-[#241b43]">
                  Notifications
                </h3>

                <p className="text-sm text-[#8d84ad]">
                  Manage reminder alerts
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-5">
              <div className="flex items-center justify-between rounded-3xl bg-[#faf7ff] p-5">
                <div>
                  <p className="font-bold text-[#241b43]">
                    Push Notifications
                  </p>

                  <p className="mt-1 text-sm text-[#8d84ad]">
                    Receive wellness updates
                  </p>
                </div>

                <button
                  onClick={() =>
                    setNotifications(
                      !notifications
                    )
                  }
                  className={`h-8 w-16 rounded-full transition ${
                    notifications
                      ? "bg-[#8a6dff]"
                      : "bg-[#ddd6f7]"
                  }`}
                >
                  <div
                    className={`h-8 w-8 rounded-full bg-white transition ${
                      notifications
                        ? "translate-x-8"
                        : ""
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between rounded-3xl bg-[#faf7ff] p-5">
                <div>
                  <p className="font-bold text-[#241b43]">
                    Calm Reminders
                  </p>

                  <p className="mt-1 text-sm text-[#8d84ad]">
                    Gentle breathing reminders
                  </p>
                </div>

                <button
                  onClick={() =>
                    setCalmReminders(
                      !calmReminders
                    )
                  }
                  className={`h-8 w-16 rounded-full transition ${
                    calmReminders
                      ? "bg-[#39b8a3]"
                      : "bg-[#d7f1eb]"
                  }`}
                >
                  <div
                    className={`h-8 w-8 rounded-full bg-white transition ${
                      calmReminders
                        ? "translate-x-8"
                        : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* APPEARANCE */}
          <div className="rounded-[36px] bg-white p-7 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eef5ff]">
                <Moon
                  size={30}
                  className="text-[#6ea8fe]"
                />
              </div>

              <div>
                <h3 className="text-[28px] font-black text-[#241b43]">
                  Appearance
                </h3>

                <p className="text-sm text-[#8d84ad]">
                  Customize your experience
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-5">
              <div className="flex items-center justify-between rounded-3xl bg-[#faf7ff] p-5">
                <div>
                  <p className="font-bold text-[#241b43]">
                    Dark Mode
                  </p>

                  <p className="mt-1 text-sm text-[#8d84ad]">
                    Reduce eye strain at night
                  </p>
                </div>

                <button
                  onClick={toggleDarkMode}
                  className={`h-8 w-16 rounded-full transition ${
                    darkMode
                      ? "bg-[#241b43]"
                      : "bg-[#ddd6f7]"
                  }`}
                >
                  <div
                    className={`h-8 w-8 rounded-full bg-white transition ${
                      darkMode
                        ? "translate-x-8"
                        : ""
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between rounded-3xl bg-[#faf7ff] p-5">
                <div>
                  <p className="font-bold text-[#241b43]">
                    Sound Effects
                  </p>

                  <p className="mt-1 text-sm text-[#8d84ad]">
                    Calm interaction sounds
                  </p>
                </div>

                <button
                  onClick={() =>
                    setSound(!sound)
                  }
                  className={`h-8 w-16 rounded-full transition ${
                    sound
                      ? "bg-[#6ea8fe]"
                      : "bg-[#dbeaff]"
                  }`}
                >
                  <div
                    className={`h-8 w-8 rounded-full bg-white transition ${
                      sound
                        ? "translate-x-8"
                        : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* PRIVACY */}
          <div className="rounded-[36px] bg-white p-7 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eefaf5]">
                <Shield
                  size={30}
                  className="text-[#39b8a3]"
                />
              </div>

              <div>
                <h3 className="text-[28px] font-black text-[#241b43]">
                  Privacy
                </h3>

                <p className="text-sm text-[#8d84ad]">
                  Your data & protection
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="rounded-3xl bg-[#faf7ff] p-5">
                <div className="flex items-center gap-3">
                  <Lock
                    size={20}
                    className="text-[#8a6dff]"
                  />

                  <p className="font-bold text-[#241b43]">
                    End-to-End Encryption
                  </p>
                </div>

                <p className="mt-3 text-sm leading-7 text-[#6d6787]">
                  Your journals and conversations stay
                  private and secure.
                </p>
              </div>

              <div className="rounded-3xl bg-[#faf7ff] p-5">
                <div className="flex items-center gap-3">
                  <Smartphone
                    size={20}
                    className="text-[#6ea8fe]"
                  />

                  <p className="font-bold text-[#241b43]">
                    Device Access
                  </p>
                </div>

                <p className="mt-3 text-sm leading-7 text-[#6d6787]">
                  Manage login sessions and connected
                  devices.
                </p>
              </div>
            </div>
          </div>

          {/* WELLNESS */}
          <div className="rounded-[36px] bg-white p-7 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fff1f6]">
                <Heart
                  size={30}
                  className="text-[#ff7fa8]"
                />
              </div>

              <div>
                <h3 className="text-[28px] font-black text-[#241b43]">
                  Wellness Preferences
                </h3>

                <p className="text-sm text-[#8d84ad]">
                  Personalize your calm space
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="rounded-3xl bg-[#faf7ff] p-5">
                <p className="font-bold text-[#241b43]">
                  Daily Motivation
                </p>

                <p className="mt-3 text-sm leading-7 text-[#6d6787]">
                  Receive gentle reminders and emotional
                  encouragement throughout the day.
                </p>
              </div>

              <div className="rounded-3xl bg-[#faf7ff] p-5">
                <p className="font-bold text-[#241b43]">
                  Calm Sounds
                </p>

                <p className="mt-3 text-sm leading-7 text-[#6d6787]">
                  Enable relaxing ambient sounds during
                  breathing exercises and games.
                </p>
              </div>

              <div className="rounded-3xl bg-[#faf7ff] p-5">
                <div className="flex items-center gap-3">
                  <Volume2
                    size={20}
                    className="text-[#39b8a3]"
                  />

                  <p className="font-bold text-[#241b43]">
                    Soft Interaction Audio
                  </p>
                </div>

                <p className="mt-3 text-sm leading-7 text-[#6d6787]">
                  Gentle sounds when interacting with the
                  app experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Settings;