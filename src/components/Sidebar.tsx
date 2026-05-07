import {
  House,
  MessageCircle,
  BookOpen,
  Activity,
  Wind,
  Puzzle,
  HeartHandshake,
  Settings,
  LogOut,
} from "lucide-react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

const navItems = [
  {
    name: "Home",
    icon: House,
    path: "/home",
  },

  {
    name: "AI Chat",
    icon: MessageCircle,
    path: "/chat",
  },

  {
    name: "Journal",
    icon: BookOpen,
    path: "/journal",
  },

  {
    name: "Mood Tracker",
    icon: Activity,
    path: "/mood",
  },

  {
    name: "Breathing",
    icon: Wind,
    path: "/breathing",
  },

  {
    name: "Games",
    icon: Puzzle,
    path: "/games",
  },

  {
    name: "Support",
    icon: HeartHandshake,
    path: "/support",
  },

  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="sticky top-0 hidden h-screen w-[280px] flex-col overflow-y-auto border-r border-[#f1ebff] bg-white px-5 py-6 lg:flex">
      {/* LOGO */}
      <div>
        <h1 className="text-[32px] font-black text-[#8a6dff]">
          YouMatter
        </h1>

        <p className="mt-1 text-sm text-[#8d84ad]">
          Your safe mental space
        </p>
      </div>

      {/* NAVIGATION */}
      <nav className="mt-10 flex flex-1 flex-col gap-3">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 ${
                  isActive
                    ? "bg-[#f2ebff] text-[#8a6dff]"
                    : "text-[#6d6787] hover:bg-[#faf7ff]"
                }`
              }
            >
              <Icon size={22} />

              <span className="text-[16px] font-semibold">
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* USER */}
      <div className="mt-6 rounded-[28px] bg-[#faf7ff] p-5">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-[#e5d8ff]" />

          <div>
            <h3 className="font-bold text-[#241b43]">
              Harshita
            </h3>

            <p className="text-sm text-[#8d84ad]">
              Mental Wellness Journey
            </p>
          </div>
        </div>

        {/* SIGN OUT */}
        <button
          onClick={() => navigate("/")}
          className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#f2ebff] px-5 py-4 text-sm font-bold text-[#8a6dff] transition hover:bg-[#e8ddff]"
        >
          <LogOut size={18} />

          Sign Out
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;