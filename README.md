# Fitness Tracker – Full-Stack Starter

A production-ready starter for a fitness tracking website.

## Tech
- **Frontend:** React + Vite, Tailwind CSS, React Router, Axios, Recharts
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT Auth, CORS, Helmet
- **Features:**
  - Email/password auth (JWT)
  - Workouts CRUD
  - Meals CRUD
  - Goals CRUD
  - Profile & progress stats
  - Simple friends (follow/unfollow) + leaderboard
  - Nutrition search (mock) – replace with Nutritionix/Edamam easily
  - Clean, responsive UI

## Quick Start

### 1) Prereqs
- Node 18+
- MongoDB running (local or Atlas)

### 2) Setup
```bash
git clone <this-zip-extracted-folder>
cd fitness-tracker

# Backend
cd server
cp .env.example .env
# edit .env with your MONGO_URI and JWT_SECRET
npm install
npm run dev

# Frontend (in a new terminal)
cd ../client
npm install
npm run dev
```

Frontend dev server runs at http://localhost:5173 and backend at http://localhost:5000 by default.

### 3) Test Login Flow
- Register a new account on `/register`
- Login at `/login`
- Explore Dashboard, Workouts, Meals, Goals, Friends

### 4) Tailwind
Tailwind is preconfigured. Edit `src/index.css` and use utility classes.

### 5) Swap Nutrition API (Optional)
- Replace `server/src/controllers/nutritionController.js` mock with real API calls (Nutritionix / Edamam).

---
