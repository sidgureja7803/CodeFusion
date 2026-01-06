# 🚀 CodeFusion

**CodeFusion** is a modern, LeetCode-like collaborative coding platform where users can solve problems, run code with Judge0, get AI-powered help (powered by Google Gemini), and collaborate in real-time with Liveblocks. The platform features a clean, minimal UI for an intuitive user experience.

## ✨ Features

- **Code Execution:** Run code with the robust **Judge0 API**.
- **AI Assistance:** Get help from **Google Gemini**, for problem understanding, solution approach, and debugging.
- **Real-time Collaboration:** Work together live, see each other's cursors, and share sessions with **Liveblocks**.
- **Submission History:** Visualize your coding activity, just like GitHub/LeetCode.
- **Minimal UI:** Clean, simple interface for an intuitive coding experience.
- **Collaboration:** Share a URL and code together in real time.
- **History:** Track your submissions and progress over time.

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** Neon PostgreSQL (via Prisma)
- **Code Execution:** Judge0 API
- **AI Model:** Google Gemini API
- **Real-time Collaboration:** Liveblocks API
- **Authentication:** Firebase

## 🔑 Environment Variables

You must set up environment variables for both frontend and backend. 

### Backend Environment Variables

For detailed setup instructions, see [backend/SETUP.md](backend/SETUP.md)

**Required:**
```env
# Neon Database (Get from https://console.neon.tech/)
DATABASE_URL="postgresql://..."  # Pooled connection
DIRECT_URL="postgresql://..."    # Direct connection for migrations

# Gemini AI (Get from https://makersuite.google.com/app/apikey)
GEMINI_API_KEY="your-api-key"
GEMINI_MODEL="gemini-1.5-flash"

# Server
PORT=5000
JWT_SECRET="your-jwt-secret"

# Firebase Auth
FIREBASE_PROJECT_ID=""
FIREBASE_PRIVATE_KEY=""
FIREBASE_CLIENT_EMAIL=""
```

### Frontend Environment Variables

```env
VITE_API_URL=
VITE_DEV_BACKEND_URL=
VITE_LIVEBLOCKS_PUBLIC_KEY=
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/sidgureja7803/CodeFusion.git
   cd codefusion
   ```
2. **Install dependencies**
   ```bash
   # Frontend
   cd frontend
   npm install
   # Backend
   cd ../backend
   npm install
   ```
3. **Set up environment variables**
   - Copy `.env.sample` to `.env` in both `frontend` and `backend` folders and fill in your API keys and secrets.
4. **Start the development servers**
   ```bash
   # Backend
   cd backend
   npm start
   # Frontend (in a new terminal)
   cd frontend
   npm start
   ```
5. **Open your browser**
   - Go to your frontend URL (e.g., `http://localhost:3000`) to use CodeFusion!

## 💡 UI/UX

- Clean, minimal design focused on functionality
- Responsive layout with Tailwind CSS
- Intuitive navigation and user experience

## 🤝 Contributing

Contributions are welcome! Please fork the repo, create a feature branch, and open a pull request. See the `.env.sample` files for required environment variables.

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Thanks to all open-source contributors
- Built with love for developers, by developers

---

**Happy Coding! 🎉**
