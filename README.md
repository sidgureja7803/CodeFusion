# 🚀 CodeFusion

**CodeFusion** is a modern, LeetCode-like collaborative coding platform where users can solve problems, run code with Judge0, get AI-powered help (Llama3-70b-8192 via Novita.ai), and collaborate in real-time with Liveblocks. The platform features a professional, animated UI using GSAP and Framer Motion for a world-class user experience.

This project was built for the hackathon organized by [lablab.ai](https://lablab.ai/) in collaboration with Trae IDE and [Novita.ai](https://novita.ai/).

## ✨ Features

- **Code Execution:** Run code with the robust **Judge0 API**.
- **AI Assistance:** Get help from the **Llama3-70b-8192** model via **Novita.ai** for problem understanding, solution approach, and debugging.
- **Real-time Collaboration:** Work together live, see each other's cursors, and share sessions with **Liveblocks**.
- **Submission History:** Visualize your coding activity, just like GitHub/LeetCode.
- **Professional UI:** Modern, animated interface using **GSAP** and **Framer Motion** for smooth transitions and delightful effects.
- **Collaboration:** Share a URL and code together in real time.
- **History:** Track your submissions and progress over time.

## 🛠️ Tech Stack

- **Frontend:** React.js, GSAP, Framer Motion, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (via Prisma)
- **Code Execution:** Judge0 API
- **AI Model:** Llama3-70b-8192 via Novita.ai API
- **Real-time Collaboration:** Liveblocks API
- **Authentication:** Firebase

## 🔑 Environment Variables

You must set up environment variables for both frontend and backend. See `.env.sample` files in each directory for all required variables.

### Frontend `.env.sample`
```
VITE_API_URL=
VITE_DEV_BACKEND_URL=
VITE_JUDGE0_API_URL=
VITE_JUDGE0_API_KEY=
VITE_NOVITA_API_KEY=
VITE_LIVEBLOCKS_PUBLIC_KEY=
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

### Backend `.env.sample`
```
DATABASE_URL=
JWT_SECRET=
FRONTEND_URL=
NODE_ENV=development
JUDGE0_API_URL=
JUDGE0_API_KEY=
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
FIREBASE_CLIENT_ID=
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

## 💡 UI/UX & Animations

- The landing page and all major sections use **GSAP** and **Framer Motion** for:
  - Animated backgrounds and gradients
  - Smooth card and section transitions
  - Floating and parallax effects
  - Professional, modern fonts and color schemes
- All animations are performance-optimized and responsive.

## 🤝 Contributing

Contributions are welcome! Please fork the repo, create a feature branch, and open a pull request. See the `.env.sample` files for required environment variables.

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Thanks to all open-source contributors
- Built with love for developers, by developers

---

**Happy Coding! 🎉**
