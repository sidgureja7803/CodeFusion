import { ArrowUpRight } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: "⚡",
      title: "Code Execution",
      description: "Run code in 40+ programming languages with real-time output",
      color: "orange",
    },
    {
      icon: "🤖",
      title: "AI Assistance",
      description: "Get intelligent help with problem solving and debugging",
      color: "purple",
    },
    {
      icon: "👥",
      title: "Collaboration",
      description: "Work together with your team in real-time coding sessions",
      color: "blue",
    },
    {
      icon: "📚",
      title: "Problem Library",
      description: "Access thousands of coding problems across all difficulty levels",
      color: "green",
    },
    {
      icon: "📊",
      title: "Submission History",
      description: "Track your progress and review past submissions",
      color: "orange",
    },
    {
      icon: "💬",
      title: "Discussion Forum",
      description: "Share solutions and learn from the community",
      color: "blue",
    },
  ];

  const colorClasses = {
    orange: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700 hover:border-orange-300 dark:hover:border-orange-600",
    purple: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700 hover:border-purple-300 dark:hover:border-purple-600",
    blue: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 hover:border-blue-300 dark:hover:border-blue-600",
    green: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700 hover:border-green-300 dark:hover:border-green-600",
  };

  return (
    <div id="features" className="py-24 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">Engineered for Excellence</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">Everything you need to master competitive programming</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`p-8 bg-white dark:bg-gray-800 border-2 ${colorClasses[feature.color]} rounded-2xl transition-all hover:shadow-lg dark:hover:shadow-orange-500/10 relative group`}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
              <ArrowUpRight className="absolute bottom-6 right-6 text-orange-500 dark:text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

