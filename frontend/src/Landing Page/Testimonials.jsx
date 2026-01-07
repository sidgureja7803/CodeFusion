export const Testimonials = () => {
  const testimonials = [
    {
      text: "CodeFusion has completely transformed how I practice coding. The real-time collaboration feature is amazing!",
      author: "Sarah Chen",
      role: "Software Engineer",
      avatar: "👩‍💻",
      color: "orange",
    },
    {
      text: "The AI assistance is incredibly helpful. It guides me without giving away the solution directly.",
      author: "Michael Rodriguez",
      role: "CS Student",
      avatar: "👨‍🎓",
      color: "blue",
    },
    {
      text: "Best platform for technical interview preparation. The problem library is comprehensive.",
      author: "Priya Sharma",
      role: "Developer",
      avatar: "👩‍💼",
      color: "purple",
    },
  ];

  const borderColors = {
    orange: "border-l-orange-500",
    blue: "border-l-blue-500",
    purple: "border-l-purple-500",
  };

  return (
    <div id="testimonials" className="py-24 bg-gradient-to-b from-orange-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-16">
          <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-4 py-2 rounded-full text-sm font-semibold mb-4 inline-block">
            ⭐ Community-Driven
          </span>
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">Loved by Developers</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">Trusted by coders worldwide</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className={`p-8 bg-white dark:bg-gray-800 border-2 border-l-4 ${borderColors[testimonial.color]} border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-lg transition-all`}>
              <div className="text-5xl mb-4 dark:text-gray-400">"</div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic">{testimonial.text}</p>
              <div className="flex items-center gap-3">
                <div className="text-3xl">{testimonial.avatar}</div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">{testimonial.author}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

