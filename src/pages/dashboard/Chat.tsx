const Home = () => {
  const cards = [
    {
      title: "Chat with Aasha",
      desc: "Talk freely and get support anytime",
      color: "bg-purple-100 text-purple-600",
      icon: "💬",
    },
    {
      title: "Journal",
      desc: "Express your thoughts safely",
      color: "bg-blue-100 text-blue-600",
      icon: "📘",
    },
    {
      title: "Mood Tracker",
      desc: "Track how you feel daily",
      color: "bg-pink-100 text-pink-600",
      icon: "💗",
    },
    {
      title: "Breathe",
      desc: "Calm your mind with exercises",
      color: "bg-green-100 text-green-600",
      icon: "🌿",
    },
    {
      title: "Lab Reports",
      desc: "Understand your reports easily",
      color: "bg-yellow-100 text-yellow-600",
      icon: "📄",
    },
    {
      title: "Profile",
      desc: "Manage your account",
      color: "bg-gray-100 text-gray-600",
      icon: "👤",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f5ff] to-white p-8">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-gray-800">
          Welcome back 💜
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Let’s take care of your mind today
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {cards.map((item, i) => (
          <div
            key={i}
            className="bg-white/70 backdrop-blur-lg p-6 rounded-3xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer border border-gray-100"
          >
            {/* Icon */}
            <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 ${item.color}`}>
              <span className="text-lg">{item.icon}</span>
            </div>

            {/* Title */}
            <h3 className="font-semibold text-gray-800 text-lg">
              {item.title}
            </h3>

            {/* Desc */}
            <p className="text-gray-400 text-sm mt-1">
              {item.desc}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Home;