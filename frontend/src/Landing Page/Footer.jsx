export const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-16 transition-colors duration-300">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-yellow-400 text-transparent bg-clip-text">
              CodeFusion
            </h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              Where coders practice and prove themselves. Built for developers, by developers.
            </p>
            <div className="flex gap-3">
              <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">🚀</span>
              <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">💻</span>
              <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">⚡</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-lg">Product</h4>
            <ul className="space-y-3">
              <li><a href="#features" className="text-gray-400 hover:text-orange-400 transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-orange-400 transition-colors">Pricing</a></li>
              <li><a href="#faqs" className="text-gray-400 hover:text-orange-400 transition-colors">FAQs</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-orange-400 transition-colors">Testimonials</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-lg">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-lg">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 dark:text-gray-500">
              © 2026 CodeFusion. All rights reserved. Made with ❤️ for coders.
            </p>
            <div className="flex gap-2">
              <span className="bg-gray-800 dark:bg-gray-900 px-3 py-1 rounded-full text-sm text-gray-400 dark:text-gray-500">Powered by Gemini AI</span>
              <span className="bg-gray-800 dark:bg-gray-900 px-3 py-1 rounded-full text-sm text-gray-400 dark:text-gray-500">Neon Database</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

