import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database, Users, FileText, ArrowLeft } from "lucide-react";

export const PrivacyPolicy = () => {
  const sections = [
    {
      icon: <Database className="w-6 h-6" />,
      title: "Information We Collect",
      content: [
        "Account Information: We collect your name, email address, and password when you create an account.",
        "Usage Data: We collect information about how you use CodeFusion, including problems solved, code submissions, and collaboration sessions.",
        "Device Information: We collect information about the device you use to access CodeFusion, including IP address, browser type, and operating system.",
        "Cookies: We use cookies and similar technologies to enhance your experience and gather analytics data."
      ]
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "How We Use Your Information",
      content: [
        "To provide, maintain, and improve CodeFusion services",
        "To personalize your experience and provide customized content",
        "To communicate with you about updates, security alerts, and support messages",
        "To analyze usage patterns and optimize platform performance",
        "To detect, prevent, and address technical issues and fraudulent activity",
        "To comply with legal obligations and enforce our Terms of Service"
      ]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Data Security",
      content: [
        "We implement industry-standard security measures to protect your personal information.",
        "All data transmissions are encrypted using SSL/TLS protocols.",
        "We use secure authentication methods including JWT tokens and email verification.",
        "Regular security audits and vulnerability assessments are conducted.",
        "Access to personal data is restricted to authorized personnel only.",
        "We maintain backup systems to prevent data loss."
      ]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Information Sharing",
      content: [
        "We do not sell, trade, or rent your personal information to third parties.",
        "We may share anonymized, aggregated data for research and analytics purposes.",
        "Third-party service providers (e.g., hosting, analytics) may access data solely to provide services on our behalf.",
        "We may disclose information if required by law or to protect our rights and safety.",
        "In the event of a merger or acquisition, user data may be transferred to the new entity."
      ]
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Your Rights",
      content: [
        "Access: You can request a copy of your personal data at any time.",
        "Correction: You can update or correct your account information through your profile settings.",
        "Deletion: You can request deletion of your account and associated data.",
        "Opt-out: You can opt out of marketing communications at any time.",
        "Data Portability: You can request your data in a machine-readable format.",
        "Withdraw Consent: You can withdraw consent for data processing where applicable."
      ]
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Data Retention",
      content: [
        "We retain your personal information for as long as your account is active.",
        "After account deletion, we may retain certain data for legal compliance and fraud prevention.",
        "Anonymized usage data may be retained indefinitely for analytics purposes.",
        "Backup copies of deleted data are removed within 90 days.",
        "You can request expedited deletion by contacting our support team."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#0a192f]">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-20 right-1/4 w-[350px] h-[350px] bg-purple-500/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-300 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20">
              <Shield className="w-12 h-12 text-blue-400" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          
          <p className="text-gray-300 mt-6 max-w-3xl mx-auto leading-relaxed">
            At CodeFusion, we take your privacy seriously. This Privacy Policy explains how we collect, 
            use, disclose, and safeguard your information when you use our platform. Please read this 
            policy carefully to understand our practices regarding your personal data.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-500"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 shrink-0">
                  {section.icon}
                </div>
                
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {section.title}
                  </h2>
                  
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3 text-gray-300 leading-relaxed">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 shrink-0"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            Questions About Privacy?
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            If you have any questions or concerns about this Privacy Policy or our data practices, 
            please don't hesitate to contact us.
          </p>
          <a
            href="mailto:privacy@codefusion.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300"
          >
            Contact Privacy Team
          </a>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-center text-gray-400 text-sm mt-12"
        >
          This Privacy Policy is effective as of the date stated above and will remain in effect 
          except with respect to any changes in its provisions in the future, which will be in 
          effect immediately after being posted on this page.
        </motion.p>
      </div>
    </div>
  );
};

