import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Star, Zap, Crown } from "lucide-react";

export const Pricing = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const plans = [
    {
      name: "Starter",
      price: "Free",
      period: "forever",
      description: "Perfect for individual developers",
      icon: <Zap className="w-6 h-6" />,
      gradient: "from-blue-500 to-cyan-500",
      features: [
        "Real-time collaboration (up to 2 users)",
        "Basic AI assistance",
        "5 projects",
        "Community support",
        "Basic code analysis"
      ],
      popular: false,
      buttonText: "Get Started Free"
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      description: "For serious developers and small teams",
      icon: <Star className="w-6 h-6" />,
      gradient: "from-purple-500 to-pink-500",
      features: [
        "Unlimited real-time collaboration",
        "Advanced AI assistant",
        "Unlimited projects",
        "Priority support",
        "Advanced code analysis",
        "Version control integration",
        "Custom workspaces"
      ],
      popular: true,
      buttonText: "Start Pro Trial"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "For large teams and organizations",
      icon: <Crown className="w-6 h-6" />,
      gradient: "from-orange-500 to-red-500",
      features: [
        "Everything in Pro",
        "SSO integration",
        "Advanced security",
        "Custom integrations",
        "Dedicated support",
        "SLA guarantees",
        "On-premise deployment"
      ],
      popular: false,
      buttonText: "Contact Sales"
    }
  ];

  return (
    <div id="pricing" className="min-h-screen p-4 relative overflow-hidden" ref={sectionRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDgwIDAgTCAwIDAgMCA4MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDQpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 h-full w-full flex flex-col items-center py-20">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: -30, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-indigo-300 bg-clip-text text-transparent">
            Simple Pricing. Powerful Features.
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Choose the perfect plan for your coding journey. Start free and scale as you grow.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl px-4">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`group relative backdrop-blur-lg border rounded-3xl p-8 transition-all duration-500 ${
                plan.popular 
                  ? 'border-purple-500/50 shadow-2xl shadow-purple-500/20 bg-white/10' 
                  : 'border-white/10 hover:border-white/30 bg-white/5'
              }`}
              style={{
                background: plan.popular 
                  ? "linear-gradient(135deg, rgba(147, 51, 234, 0.15) 0%, rgba(255,255,255,0.1) 100%)"
                  : "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                backdropFilter: "blur(20px)",
                boxShadow: plan.popular 
                  ? "0 20px 40px rgba(147, 51, 234, 0.2)" 
                  : "0 8px 32px rgba(0,0,0,0.1)"
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.gradient} flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-all duration-500 shadow-lg`}>
                {plan.icon}
              </div>

              {/* Plan details */}
              <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors duration-300">{plan.name}</h3>
              <p className="text-gray-400 mb-8 text-lg group-hover:text-gray-300 transition-colors duration-300">{plan.description}</p>

              {/* Price */}
              <div className="mb-10">
                <div className="flex items-baseline mb-2">
                  <span className="text-5xl font-bold text-white group-hover:text-blue-200 transition-colors duration-300">{plan.price}</span>
                  {plan.price !== "Free" && plan.price !== "Custom" && (
                    <span className="text-gray-400 ml-2 text-lg">/{plan.period.split(' ')[0]}</span>
                  )}
                </div>
                <p className="text-gray-400 text-base">{plan.period}</p>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${plan.gradient} flex items-center justify-center mr-3 mt-0.5 group-hover:scale-110 transition-transform duration-300`}>
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: plan.popular ? "0 20px 40px rgba(147, 51, 234, 0.4)" : "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                {plan.buttonText}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="mt-20 text-center"
        >
          <p className="text-xl text-gray-300 mb-8">
            All plans include our core collaboration features and 24/7 support
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            Compare All Features
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};
