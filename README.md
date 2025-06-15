# CodeFusion

<div align="center">
  <img src="frontend/public/ArkhamBanner.png" alt="CodeFusion Banner" width="100%">

  <p align="center">
    <strong>Collaborative Coding Platform with Real-Time Editing and AI Assistance</strong>
  </p>

  <p align="center">
    💻 Solve. Collaborate. Evolve. ⚡
  </p>

  <p align="center">
    <a href="https://codefusion.live">🌐 Live Demo</a>
  </p>
</div>

---

## 🎯 Project Overview

**CodeFusion** is a cutting-edge platform built for collaborative problem-solving, code sharing, and AI-powered assistance. From real-time code collaboration and custom problem creation to AI-guided solutions and test case management, CodeFusion is the ultimate playground for developers and learners.

This project was developed during the Trae AI IDE: Zero Limits Hackathon and aims to streamline the problem-solving journey by fusing teamwork, learning, and technology.

---

## ✨ Key Features

### 🛠️ Core Features

* 🚀 **Real-Time Code Collaboration** with Liveblocks
* ✍️ **Custom Problem Creation** with difficulty, tags, and company mappings
* ✅ **Code Submissions** using Judge0 API (multi-language support)
* 🧪 **Test Case Management** for every question
* 📊 **Submission History** with analytics

### 🤖 AI-Powered Assistant

* 💬 **AI Code Review & Debugging** via Novita AI (Llama 3 8b instruct)
* 🤖 **Smart Hints & Explanations** contextual to your code
* 🧠 **DSA Topic Guidance** based on user queries

### 👥 User Experience

* 🔐 **JWT-Based Authentication** with secure refresh tokens
* 🌈 **Monaco Editor** with syntax highlighting and theme switching
* 📂 **Personal Dashboard** for tracking submissions and solving streaks
* 📋 **Tag-Based Filters** to explore and solve targeted questions

---

## 🔧 Tech Stack

### Frontend

* React + Vite
* Tailwind CSS
* Monaco Editor
* Liveblocks (Real-time sync)
* Zustand (State management)
* React Hook Form + Zod
* Framer Motion / GSAP (Animations)

### Backend

* Node.js + Express
* PostgreSQL + Prisma ORM
* Judge0 API (Code Execution)
* Novita AI (LLaMA 3.3 70B for assistance)
* JWT Auth (with access and refresh tokens)

### DevOps

* Dockerized Services
* Azure VM Hosting
* NGINX Reverse Proxy
* PM2 Process Manager

---

## 🚀 Getting Started

### Prerequisites

* Node.js 18+
* PostgreSQL 14+
* Docker (optional)

### Installation

```bash
# Clone the repo
$ git clone https://github.com/yourusername/codefusion.git
$ cd codefusion
```

### Backend Setup

```bash
cd backend
npm install
cp .env.sample .env
# Set DB & API keys
npx prisma migrate dev
npx prisma generate
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Access Locally

* Frontend: [http://localhost:5173](http://localhost:5173)
* Backend: [http://localhost:3000](http://localhost:3000)

---

## 📁 Folder Structure

```
codefusion/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── utils/
│   └── public/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── prisma/
│   │   ├── middleware/
```

---

## 📌 Environment Variables

### Backend (.env)

```env
DATABASE_URL="postgresql://username:password@localhost:5432/codefusion"
JWT_SECRET="supersecret"
JWT_REFRESH_SECRET="refreshsecret"
JUDGE0_API_URL="https://judge0-instance-url"
NOVITA_API_KEY="your-novita-api-key"
LIVEBLOCKS_SECRET_KEY="liveblocks-secret"
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000/api/v1
```

---

## 🧠 AI Model Usage Strategy

| Task              | Model                |
| ----------------- | -------------------- |
| Quick Hint        | Mistral / LLaMA 3.8B |
| Code Review       | LLaMA 3.3 70B        |
| Explanation       | LLaMA 3.3 70B        |
| Speed-First Tasks | Dolphin / Mistral    |

Use Novita AI's API to switch models dynamically based on query type.

---

## 🏆 Achievements

* Built under 48 hours in a Hackathon
* Fully production-ready architecture
* Real-time collaboration engine
* AI-enhanced learning and review
* Seamless test case + tag system

---

## 📈 Roadmap

* [ ] GitHub Integration (import & submit from repo)
* [ ] AI Voice Feedback (via LLM + speech API)
* [ ] Custom Leaderboards & Tournaments
* [ ] Mobile App Version
* [ ] Browser Extension for Question Snippets

---

## 🙌 Acknowledgments

* **Judge0** for powering code execution
* **Novita AI** for robust model access
* **Liveblocks** for real-time sync support
* **Hackathon Team & Mentors** for guidance

---

## 📬 Contact

**Siddhant Gureja**
[LinkedIn](https://linkedin.com/in/siddhantgureja) • [GitHub](https://github.com/sidgureja7803) • [Email](mailto:siddhantgureja39@gmai.com)

Live Demo: [https://codefusion.live](https://codefusion.live)

---

<div align="center">
  <strong>Code. Collaborate. Conquer. — Welcome to CodeFusion ⚡</strong>
</div>
