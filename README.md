# 🚀 CodeFusion

**CodeFusion** is a modern collaborative coding platform that brings developers together to code in real-time, learn from each other, and build amazing projects with the power of AI assistance.

## ✨ Features

### 🤝 Real-Time Collaboration
- **Live Code Editing**: Code together with your team in real-time
- **Shared Cursors**: See exactly where your teammates are working
- **Instant Sync**: Changes appear instantly across all connected users
- **Voice & Video Chat**: Communicate while you code

### 🤖 AI-Powered Assistant
- **Intelligent Code Suggestions**: Get contextually relevant code completions
- **Debugging Help**: AI-powered error detection and solutions
- **Code Explanations**: Understand complex code with AI explanations
- **Best Practices**: Learn coding best practices as you work

### 📁 Project Management
- **Team Workspaces**: Organize your projects and collaborate with your team
- **Version Control Integration**: Seamless Git integration
- **Project Templates**: Quick start with pre-configured project templates
- **Progress Tracking**: Monitor your coding progress and achievements

### 🎯 Learning & Growth
- **Coding Challenges**: Practice with curated coding problems
- **Skill Assessment**: Track your programming skills and improvement
- **Community Learning**: Learn from other developers in the community
- **Achievement System**: Earn badges and track your coding journey

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Vite** - Lightning-fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Framer Motion** - Smooth animations and transitions
- **GSAP** - High-performance animations and effects
- **Lucide React** - Beautiful, customizable icons

### Backend
- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Fast, unopinionated web framework
- **Prisma** - Next-generation ORM for database management
- **PostgreSQL** - Robust, scalable relational database
- **JWT** - Secure authentication and authorization
- **LLaMA API** - Advanced AI integration for code assistance

### Real-Time Features
- **WebSockets** - Real-time bidirectional communication
- **Operational Transformation** - Conflict-free collaborative editing
- **Live Cursors** - Real-time cursor sharing and presence

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database
- LLaMA API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sidgureja7803/codefusion.git
   cd codefusion
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the backend directory:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/codefusion"
   JWT_SECRET="your-super-secret-jwt-key"
   LLAMA_API_KEY="your-llama-api-key"
   LLAMA_API_URL="https://api.llama-api.com"
   PORT=5000
   ```

   Create a `.env` file in the frontend directory:
   ```env
   VITE_API_URL="http://localhost:5000"
   ```

4. **Set up the database**
   ```bash
   cd backend
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Start the development servers**
   
   Backend:
   ```bash
   cd backend
   npm run dev
   ```
   
   Frontend (in a new terminal):
   ```bash
   cd frontend
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173` to see CodeFusion in action!

## 📖 Usage

### Creating Your First Project
1. Sign up for a CodeFusion account
2. Click "New Project" on your dashboard
3. Choose a project template or start from scratch
4. Invite team members to collaborate
5. Start coding together in real-time!

### Using AI Assistant
1. Open any project in the code editor
2. Type your code and get intelligent suggestions
3. Ask questions in natural language for help
4. Get explanations for complex code snippets

### Collaborative Features
1. Share your project link with team members
2. See live cursors and selections
3. Use voice/video chat for better communication
4. Track changes and manage versions with Git integration

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to all the amazing developers who contribute to open source
- Inspired by the collaborative coding community
- Built with love for developers, by developers

---

**Happy Coding! 🎉**

*CodeFusion - Where collaborative coding meets AI-powered development*
