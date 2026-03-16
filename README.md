# ⚔️ Zoro Habit Dojo

> *"I don't know the way. But I'll cut a path through."* — Roronoa Zoro

A full-stack habit tracking app inspired by Roronoa Zoro's discipline and warrior spirit. Track daily habits, visualize your progress, and build your legend — one day at a time.

---

## 📸 Screenshots

### 🏠 Dojo — Home
<img src="screenshots/dojo.png" width="320" alt="Dojo Home Screen"/>

> Calendar heatmap with color-coded completion, daily stats (done today, completion %, streak), and monthly navigation.

---

### ➕ Forge New Habit
<img src="screenshots/forge.png" width="320" alt="Forge Habit Modal"/>

> Yes/No or Quantity tracking type, custom daily target, unit label, color picker, and live preview.

---

### ⚔️ Habit Cards
<img src="screenshots/habits.png" width="320" alt="Habit Cards"/>

> Quantity habits with +/− controls and progress bars. Yes/No habits with tap-to-complete button. Per-habit color coding.

---

### 📊 Battle Stats
<img src="screenshots/stats1.png" width="320" alt="Battle Stats Dashboard"/>

> Summary cards (streak, today, 30d avg, best day) and 30-day area chart with completion trend.

---

### 📈 Weekly & Monthly Trends
<img src="screenshots/stats2.png" width="320" alt="Weekly and Monthly Charts"/>

> Weekly bar chart (last 12 weeks), monthly line chart (last 6 months), and per-habit completion rate bars.

---

### 🎯 Mastery Radar
<img src="screenshots/mastery1.png" width="320" alt="Mastery Radar and Leaderboard"/>

> 30-day mastery radar chart and habit leaderboard ranked by completion rate.

---

### 🌿 30-Day Completion
<img src="screenshots/mastery2.png" width="320" alt="30 Day Completion Bars"/>

> Per-habit horizontal completion bars with growth indicators.

---

## ✨ Features

### 🏠 Dojo (Home)
- Personalized welcome with random Zoro quotes
- Live stats — habits done today, completion %, current streak
- Interactive monthly calendar with color-coded heatmap
- Select any past date to view/edit that day's logs

### ➕ Forge Habit
- **Yes / No habits** — simple checkbox completion
- **Quantity habits** — set a daily target with custom units (km, hrs, pages, ltr…)
- Color picker with 8 palette options
- Live preview before saving

### 📊 Battle Stats (Dashboard)
- Summary cards — streak, today's score, 30-day average, best day
- 30-day area chart with completion trend
- Weekly bar chart (last 12 weeks)
- Monthly line chart (last 6 months)
- Per-habit completion rate bars

### 🌿 Year in Review
- Full 365-day GitHub-style heatmap
- Hover tooltips showing exact score per day
- Month labels and legend
- 4 yearly stat cards — perfect days, streak, year average, active days
- Monthly breakdown bar chart

### 🎯 Mastery
- Mastery radar chart (30-day per habit)
- Habit leaderboard ranked by completion rate
- Current streak per habit
- 7-day per-habit line chart
- Horizontal 30-day completion bar chart

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Styling | Inline styles + CSS variables |
| Animation | Framer Motion |
| Charts | Recharts |
| Backend | Node.js + Express |
| Database | MongoDB Atlas + Mongoose |
| Auth | JWT + bcryptjs |
| Fonts | Cinzel Decorative, Cinzel, Crimson Pro |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/zoro-habit-dojo.git
cd zoro-habit-dojo
```

### 2. Setup Backend
```bash
cd server
npm install
```

Create a `.env` file in `server/`:
```env
PORT=5000
MONGO_URI=mongodb+srv://YOUR_USER:YOUR_PASSWORD@cluster.mongodb.net/?appName=zoro
JWT_SECRET=your_secret_key
```

Start the server:
```bash
npm run dev
```

Server runs on `http://localhost:5000`

### 3. Setup Frontend
```bash
cd zoro-habit-tracker
npm install
npm run dev
```

App runs on `http://localhost:5173`

---

## 📁 Project Structure

```
zoro-habit-dojo/
├── server/
│   ├── config/
│   │   ├── db.js                  # MongoDB connection
│   │   └── middleware/
│   │       └── authMiddleware.js  # JWT protection
│   ├── controllers/
│   │   ├── authController.js      # Register, login
│   │   └── habitController.js     # CRUD + log update
│   ├── models/
│   │   ├── User.js
│   │   └── Habit.js               # Mongoose Map for logs
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── habitRoutes.js
│   ├── utils/
│   │   └── generateToken.js
│   └── server.js
│
└── zoro-habit-tracker/
    └── src/
        ├── api/                   # Axios instances + endpoints
        ├── app/
        │   └── TrackerApp.jsx     # Main app shell + state
        ├── constants/
        │   └── designTokens.js    # Colors, fonts, constants
        ├── habits/
        │   ├── AddModal.jsx       # Forge new habit modal
        │   └── HabitCard.jsx      # Individual habit card
        ├── layout/
        │   ├── Shell.jsx          # Page wrapper + background
        │   └── BottomNav.jsx      # Tab navigation
        ├── pages/
        │   ├── LandingPage.jsx
        │   ├── SignInPage.jsx
        │   ├── SignUpPage.jsx
        │   ├── HomePage.jsx       # Dojo — calendar + habits
        │   ├── DashboardPage.jsx  # Stats + charts
        │   ├── YearlyPage.jsx     # 365-day heatmap
        │   └── MasteryPage.jsx    # Deep analytics
        ├── ui/                    # Reusable components
        └── utils/
            └── dateUtils.js       # Date helpers + score functions
```

---

## 🌐 Deployment

### Backend → Render
1. Push `server/` to GitHub
2. Create new Web Service on [render.com](https://render.com)
3. Set environment variables: `MONGO_URI`, `JWT_SECRET`, `PORT`
4. Build command: `npm install` — Start command: `npm start`

### Frontend → Vercel
1. Push `zoro-habit-tracker/` to GitHub
2. Import on [vercel.com](https://vercel.com)
3. Add environment variable: `VITE_API_URL=https://your-render-url.onrender.com/api`
4. Build command: `npm run build` — Output: `dist`

---

## 📱 Mobile App (APK)

To build an Android APK using Capacitor:

```bash
cd zoro-habit-tracker
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init "Zoro Dojo" "com.zorodojo.app" --web-dir dist
npm run build
npx cap add android
npx cap copy
npx cap open android
```

In Android Studio: **Build → Build APK(s)**

APK output: `android/app/build/outputs/apk/debug/app-debug.apk`

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Sign in, returns JWT |

### Habits (all protected — requires Bearer token)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/habits` | Get all habits for user |
| POST | `/api/habits` | Create new habit |
| DELETE | `/api/habits/:id` | Delete habit |
| PUT | `/api/habits/:id/log` | Update a day's log value |

---

## ⚔️ Habit Model

```js
{
  user:   ObjectId,           // ref to User
  name:   String,             // habit name
  type:   "bool" | "quantity",
  target: Number,             // daily target (quantity habits)
  unit:   String,             // e.g. "km", "hrs", "pages"
  color:  String,             // hex color
  logs:   Map<String, Number> // { "2026-03-16": 1 }
}
```

---

## 🙏 Credits

- Inspired by **Roronoa Zoro** from One Piece
- Fonts: [Google Fonts](https://fonts.google.com) — Cinzel Decorative, Cinzel, Crimson Pro
- Charts: [Recharts](https://recharts.org)
- Animations: [Framer Motion](https://www.framer.com/motion)

---

*Nothing happened.* ⚔️
