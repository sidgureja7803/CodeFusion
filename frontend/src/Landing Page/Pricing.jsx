import { Link } from "react-router-dom";
import { Check, Zap } from "lucide-react";

export const Pricing = () => {
  return (
    <div id="pricing" className="py-24 bg-white">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600">Start for free, upgrade when you're ready</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="p-10 bg-white border-2 border-gray-200 rounded-3xl hover:border-gray-300 transition-all hover:shadow-lg">
            <div className="mb-6">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Free</h3>
              <p className="text-gray-600">Perfect for getting started</p>
            </div>
            <p className="mb-8">
              <span className="text-6xl font-bold text-gray-900">$0</span>
              <span className="text-xl text-gray-600 ml-2">/month</span>
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-start gap-3">
                <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                <span className="text-gray-700">Access to all coding problems</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                <span className="text-gray-700">Code execution in 40+ languages</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                <span className="text-gray-700">Basic AI assistance</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                <span className="text-gray-700">Community discussions</span>
              </li>
            </ul>
            <Link to="/sign-up">
              <button className="w-full px-8 py-4 bg-white text-gray-900 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-all">
                Get Started Free
              </button>
            </Link>
          </div>

          <div className="p-10 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-3xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-xl hover:shadow-2xl relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <span className="bg-yellow-400 text-orange-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <Zap size={12} />
                POPULAR
              </span>
            </div>
            <div className="mb-6">
              <h3 className="text-3xl font-bold mb-2">Pro</h3>
              <p className="text-orange-100">For serious coders</p>
            </div>
            <p className="mb-8">
              <span className="text-6xl font-bold">$9</span>
              <span className="text-xl text-orange-100 ml-2">/month</span>
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-start gap-3">
                <Check className="text-yellow-300 flex-shrink-0 mt-1" size={20} />
                <span>Everything in Free</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-yellow-300 flex-shrink-0 mt-1" size={20} />
                <span>Advanced AI features & explanations</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-yellow-300 flex-shrink-0 mt-1" size={20} />
                <span>Real-time collaboration sessions</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-yellow-300 flex-shrink-0 mt-1" size={20} />
                <span>Priority support & feedback</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-yellow-300 flex-shrink-0 mt-1" size={20} />
                <span>Custom problem playlists</span>
              </li>
            </ul>
            <Link to="/sign-up">
              <button className="w-full px-8 py-4 bg-white text-orange-600 rounded-xl font-bold hover:bg-orange-50 transition-all shadow-lg transform hover:scale-105">
                Upgrade to Pro
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

