import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Star, Zap, Crown } from "lucide-react";
import gsap from "gsap";

export const Pricing = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated background gradient
      gsap.to(".pricing-bg", {
        backgroundPosition: "200% 200%",
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: "none"
      });

      // Floating elements animation
      gsap.to(".floating-element", {
        y: -15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.8
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

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
      popular: false
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
      popular: true
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
      popular: false
    }
  ];

  return (
    <div id="pricing" className="min-h-[95vh] p-4 relative overflow-hidden" ref={sectionRef}>
      {/* Animated Background */}
      <div className="pricing-bg absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900"
           style={{
             backgroundSize: "400% 400%",
             backgroundImage: "linear-gradient(-45deg, #0f172a, #312e81, #1e3a8a, #1e293b, #0f172a)"
           }}>
        
        {/* Floating geometric shapes */}
        <div className="floating-element absolute top-32 left-16 w-20 h-20 bg-blue-500/10 rounded-lg rotate-45 blur-sm"></div>
        <div className="floating-element absolute top-48 right-24 w-16 h-16 bg-purple-500/10 rounded-full blur-sm"></div>
        <div className="floating-element absolute bottom-32 left-32 w-24 h-24 bg-cyan-500/10 rounded-lg rotate-12 blur-sm"></div>
        <div className="floating-element absolute bottom-48 right-16 w-18 h-18 bg-pink-500/10 rounded-full blur-sm"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDgwIDAgTCAwIDAgMCA4MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDIpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 h-full w-full flex flex-col items-center py-16">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="sm:text-5xl text-4xl text-center mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent font-bold"
        >
          Simple Pricing. Powerful Features.
        </motion.h1>
        
        <motion.p
          initial={{ y: -15, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: -15, opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="sm:text-lg text-base text-center mt-4 text-gray-300 max-w-2xl px-4 mb-12"
        >
          Choose the perfect plan for your coding journey. Start free and scale as you grow.
        </motion.p>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl px-4"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className={`relative bg-white/5 backdrop-blur-sm border rounded-2xl p-8 transition-all duration-300 ${
                plan.popular 
                  ? 'border-purple-500/50 shadow-lg shadow-purple-500/20' 
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${plan.gradient} flex items-center justify-center text-white mb-6`}>
                {plan.icon}
              </div>

              {/* Plan details */}
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-gray-400 mb-6">{plan.description}</p>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.price !== "Free" && plan.price !== "Custom" && (
                    <span className="text-gray-400 ml-2">/{plan.period}</span>
                  )}
                </div>
                {plan.price === "Free" && (
                  <span className="text-gray-400 text-sm">{plan.period}</span>
                )}
                {plan.price === "Custom" && (
                  <span className="text-gray-400 text-sm">{plan.period}</span>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }`}
              >
                {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 text-sm">
            All plans include 14-day free trial • No credit card required • Cancel anytime
          </p>
        </motion.div>
      </div>
    </div>
  );
};
