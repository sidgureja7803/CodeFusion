import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

export const CTA = () => {
  return (
    <div className="py-24 bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 transition-colors duration-300">
      <div className="container mx-auto max-w-5xl px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles className="text-yellow-300 dark:text-yellow-200" size={32} />
          <span className="text-yellow-300 dark:text-yellow-200 text-lg font-semibold">Start Your Journey</span>
        </div>
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Ready to Level Up Your Coding?
        </h2>
        <p className="text-xl text-orange-100 dark:text-orange-200 mb-10 max-w-2xl mx-auto leading-relaxed">
          Join thousands of developers mastering their craft with CodeFusion. Practice, collaborate, and prove yourself.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/sign-up">
            <button className="px-10 py-4 bg-white text-orange-600 rounded-xl font-bold hover:bg-orange-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2">
              Join For Free
              <ArrowRight size={20} />
            </button>
          </Link>
          <Link to="/sign-in">
            <button className="px-10 py-4 bg-transparent text-white border-2 border-white rounded-xl font-bold hover:bg-white hover:text-orange-600 transition-all">
              Sign In
            </button>
          </Link>
        </div>
        <p className="text-orange-100 dark:text-orange-200 mt-6 text-sm">No credit card required • Free forever plan</p>
      </div>
    </div>
  );
};

