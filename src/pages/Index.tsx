const Index = () => {
  return (
    <div className="p-8">

      {/* Greeting */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          Welcome back 💜
        </h1>
        <p className="text-gray-400 text-sm">
          Let’s take care of your mind today
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Chat */}
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer">
          <div className="text-purple-600 text-xl mb-3">💬</div>
          <h3 className="font-semibold text-gray-800">Chat with Aasha</h3>
          <p className="text-gray-400 text-sm mt-1">
            Talk freely and get support anytime
          </p>
        </div>

        {/* Journal */}
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer">
          <div className="text-blue-500 text-xl mb-3">📘</div>
          <h3 className="font-semibold text-gray-800">Journal</h3>
          <p className="text-gray-400 text-sm mt-1">
            Express your thoughts safely
          </p>
        </div>

        {/* Mood */}
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer">
          <div className="text-pink-500 text-xl mb-3">💗</div>
          <h3 className="font-semibold text-gray-800">Mood Tracker</h3>
          <p className="text-gray-400 text-sm mt-1">
            Track how you feel daily
          </p>
        </div>

        {/* Breathe */}
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer">
          <div className="text-green-500 text-xl mb-3">🌿</div>
          <h3 className="font-semibold text-gray-800">Breathe</h3>
          <p className="text-gray-400 text-sm mt-1">
            Calm your mind with exercises
          </p>
        </div>

        {/* Reports */}
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer">
          <div className="text-yellow-500 text-xl mb-3">📄</div>
          <h3 className="font-semibold text-gray-800">Lab Reports</h3>
          <p className="text-gray-400 text-sm mt-1">
            Understand your reports easily
          </p>
        </div>

        {/* Profile */}
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer">
          <div className="text-gray-600 text-xl mb-3">👤</div>
          <h3 className="font-semibold text-gray-800">Profile</h3>
          <p className="text-gray-400 text-sm mt-1">
            Manage your account
          </p>
        </div>

      </div>

    </div>
  );
};

export default Index;