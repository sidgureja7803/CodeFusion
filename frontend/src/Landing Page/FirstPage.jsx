import { Link } from "react-router-dom";
import { Code2, Users, Sparkles } from "lucide-react";

export const FirstPage = () => {
  return (
    <div id="home" className="min-h-screen w-full bg-gradient-to-b from-orange-50 to-white flex items-center justify-center px-4">
      <div className="max-w-5xl text-center">
        {/* Badge */}
        <div className="mb-6 inline-block">
          <span className="bg-orange-100 border border-orange-200 px-4 py-2 rounded-full text-orange-600 text-sm font-semibold">
            🚀 Collaborative Coding Platform
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-6xl md:text-7xl font-bold mb-6 text-gray-900">
          Where Coders <span className="bg-gradient-to-r from-orange-500 to-yellow-500 text-transparent bg-clip-text">Practice</span> and <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">Prove</span> Themselves
        </h1>
        
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          Train rigorously, solve real challenges, and sharpen your coding mind. CodeFusion is your lab to practice and push past your limits.
        </p>
        
        <div className="flex gap-4 justify-center mb-16">
          <Link to="/sign-up">
            <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
              Join For Free
            </button>
          </Link>
          <Link to="/sign-in">
            <button className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-all">
              Explore Problems
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Code2 className="text-orange-600" size={24} />
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-lg">Execute Code</h3>
            <p className="text-sm text-gray-600">Run code in 40+ programming languages instantly</p>
          </div>
          <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Users className="text-blue-600" size={24} />
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-lg">Collaborate</h3>
            <p className="text-sm text-gray-600">Work together in real-time coding sessions</p>
          </div>
          <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Sparkles className="text-purple-600" size={24} />
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-lg">AI Help</h3>
            <p className="text-sm text-gray-600">Get intelligent assistance powered by Gemini</p>
          </div>
        </div>
      </div>
    </div>
  );
};

