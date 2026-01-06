export const FAQs = () => {
  const faqs = [
    {
      question: "What is CodeFusion?",
      answer: "CodeFusion is a collaborative coding platform with AI assistance, real-time code execution, and a comprehensive problem library.",
      emoji: "🤔",
    },
    {
      question: "Is it free to use?",
      answer: "Yes! We offer a free tier with access to core features. Upgrade to Pro for advanced capabilities.",
      emoji: "💰",
    },
    {
      question: "What programming languages are supported?",
      answer: "We support 40+ programming languages including Python, JavaScript, Java, C++, Go, Rust, and more.",
      emoji: "💻",
    },
    {
      question: "How does the AI assistance work?",
      answer: "Our AI assistant powered by Google Gemini helps you understand problems, debug code, and provides hints without giving away complete solutions.",
      emoji: "🤖",
    },
    {
      question: "Can I collaborate with others?",
      answer: "Yes! Pro users can share sessions and code together in real-time with live cursors and synchronization.",
      emoji: "👥",
    },
    {
      question: "How do I get started?",
      answer: "Simply sign up for a free account, choose a problem, and start coding. No credit card required for free tier.",
      emoji: "🚀",
    },
  ];

  return (
    <div id="faqs" className="py-24 bg-gradient-to-b from-white to-orange-50">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">Everything you need to know</p>
        </div>

        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div key={index} className="p-8 bg-white border-2 border-gray-200 rounded-2xl hover:border-orange-300 transition-all hover:shadow-md">
              <div className="flex items-start gap-4">
                <span className="text-3xl flex-shrink-0">{faq.emoji}</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

