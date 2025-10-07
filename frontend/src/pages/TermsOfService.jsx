import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Scale, AlertCircle, UserCheck, Code, Shield, ArrowLeft } from "lucide-react";

export const TermsOfService = () => {
  const sections = [
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "1. Acceptance of Terms",
      content: [
        "By accessing or using CodeFusion, you agree to be bound by these Terms of Service and all applicable laws and regulations.",
        "If you do not agree with any part of these terms, you may not access or use the service.",
        "We reserve the right to update and modify these terms at any time without prior notice.",
        "Your continued use of CodeFusion after any changes constitutes acceptance of those changes.",
        "You must be at least 13 years old to use this service. Users under 18 require parental consent."
      ]
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "2. Service Description",
      content: [
        "CodeFusion provides an online collaborative coding platform with AI-powered assistance.",
        "The service includes code execution, real-time collaboration, problem-solving tools, and educational content.",
        "We offer multiple subscription tiers with varying features and capabilities.",
        "Service features and availability may vary based on your subscription plan.",
        "We reserve the right to modify, suspend, or discontinue any part of the service at any time."
      ]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "3. User Accounts",
      content: [
        "You must create an account to access most features of CodeFusion.",
        "You are responsible for maintaining the confidentiality of your account credentials.",
        "You agree to provide accurate, current, and complete information during registration.",
        "You are responsible for all activities that occur under your account.",
        "You must notify us immediately of any unauthorized use of your account.",
        "We reserve the right to suspend or terminate accounts that violate these terms."
      ]
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "4. Acceptable Use Policy",
      content: [
        "You agree not to use CodeFusion for any unlawful or prohibited purpose.",
        "You will not upload or share malicious code, viruses, or harmful content.",
        "You will not attempt to gain unauthorized access to our systems or other users' accounts.",
        "You will not use the service to infringe on intellectual property rights of others.",
        "You will not engage in any activity that disrupts or interferes with the service.",
        "You will not use automated systems to access the service without our permission.",
        "You will not impersonate others or misrepresent your affiliation with any person or entity."
      ]
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "5. Intellectual Property",
      content: [
        "All content, features, and functionality of CodeFusion are owned by us and protected by intellectual property laws.",
        "You retain ownership of the code and content you create using CodeFusion.",
        "By using the service, you grant us a license to host, store, and display your content as necessary to provide the service.",
        "You may not copy, modify, distribute, or reverse engineer any part of our platform without permission.",
        "Our trademarks, logos, and brand features may not be used without our express written consent.",
        "Any feedback or suggestions you provide may be used by us without obligation to you."
      ]
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: "6. Payment and Billing",
      content: [
        "Subscription fees are billed in advance on a monthly or annual basis, depending on your chosen plan.",
        "All fees are non-refundable except as required by law or as explicitly stated in our refund policy.",
        "You authorize us to charge your payment method for all fees incurred.",
        "Prices are subject to change with 30 days' notice to active subscribers.",
        "Failure to pay may result in suspension or termination of your account.",
        "You are responsible for all taxes associated with your purchase."
      ]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "7. Limitation of Liability",
      content: [
        "CodeFusion is provided 'as is' without warranties of any kind, either express or implied.",
        "We do not guarantee that the service will be uninterrupted, secure, or error-free.",
        "We are not liable for any indirect, incidental, special, or consequential damages.",
        "Our total liability shall not exceed the amount you paid for the service in the past 12 months.",
        "You use the service at your own risk and are responsible for backing up your data.",
        "We are not responsible for any loss of data, code, or other content."
      ]
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "8. Termination",
      content: [
        "You may terminate your account at any time through your account settings.",
        "We may suspend or terminate your account for violation of these terms.",
        "Upon termination, your right to use the service will immediately cease.",
        "We may delete your account data following termination, subject to our data retention policy.",
        "Certain provisions of these terms will survive termination, including intellectual property rights and limitation of liability."
      ]
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "9. Governing Law",
      content: [
        "These terms shall be governed by and construed in accordance with applicable laws.",
        "Any disputes arising from these terms or your use of the service shall be resolved through binding arbitration.",
        "You waive any right to participate in a class action lawsuit or class-wide arbitration.",
        "If any provision of these terms is found to be unenforceable, the remaining provisions will remain in effect.",
        "These terms constitute the entire agreement between you and CodeFusion regarding the service."
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
              <Scale className="w-12 h-12 text-blue-400" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          
          <p className="text-gray-300 mt-6 max-w-3xl mx-auto leading-relaxed">
            Welcome to CodeFusion. These Terms of Service govern your use of our platform and services. 
            By using CodeFusion, you agree to comply with and be bound by the following terms and conditions. 
            Please review them carefully.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-500"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 shrink-0 text-blue-400">
                  {section.icon}
                </div>
                
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-white mb-4">
                    {section.title}
                  </h2>
                  
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3 text-gray-300 leading-relaxed text-sm">
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
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-16 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            Questions About These Terms?
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            If you have any questions or concerns about these Terms of Service, please contact 
            our legal team for clarification.
          </p>
          <a
            href="mailto:legal@codefusion.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300"
          >
            Contact Legal Team
          </a>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="text-center text-gray-400 text-sm mt-12"
        >
          By using CodeFusion, you acknowledge that you have read, understood, and agree to be 
          bound by these Terms of Service. If you do not agree to these terms, please discontinue 
          use of the service immediately.
        </motion.p>
      </div>
    </div>
  );
};

