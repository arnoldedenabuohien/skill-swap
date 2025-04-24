# SkillSwap — Full Stack Proof of Concept

**Date:** April 23, 2025  
**Author:** AI-Generated Technical Prompt  
**Theme:** Peer-to-peer academic support for students

---

## 🧠 Overview

**SkillSwap** is a full-stack web application designed to allow students to exchange academic support. Students can **offer help** in subjects they’re confident with and **request help** in subjects they need assistance with.

---

## 🛠 Tech Stack

- **Frontend:** Vite + React + TypeScript  
- **Styling:** TailwindCSS + Shadcn UI  
- **Backend:** Express.js (Node.js)  
- **Database:** MongoDB (via Mongoose)

---

## 🎨 Frontend Requirements

### Pages:

#### 1. Home Page
- Displays a list of all SkillSwaps retrieved from the backend.
- Each card should show:
  - ✅ `Can Help With`
  - 🆘 `Needs Help With`
  - ✏️ `Notes`
  - 📅 `Posted Date`
  - 📩 “I’m Interested” Button (shows alert or toast)

#### 2. Post Swap Page
- Form with Shadcn UI components:
  - `canHelpWith` (text input)
  - `needsHelpWith` (text input)
  - `notes` (optional textarea)
- Submits to backend via `POST` and redirects to Home page.

### UI Notes:
- Tailwind-based responsive layout
- Use Shadcn form elements and card components
- Include toast alerts for feedback
- Include Tailwind Dark Mode

---

## 🔧 Backend Requirements

### Express Server:
- JSON API served under `/api/swaps`

### API Routes:
- `GET /api/swaps` → Fetch all swap posts
- `POST /api/swaps` → Submit a new swap post

### Mongoose Schema:
```js
{
  canHelpWith: String,
  needsHelpWith: String,
  notes: String,
  postedAt: { type: Date, default: Date.now }
}
```

### .env file should contain:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/skillswap
PORT=5000
```

---

## 📁 File Structure

```
skill-swap/
├── client/                # Vite + React
│   ├── src/
│   │   ├── components/    # SwapCard.tsx, SwapForm.tsx
│   │   ├── pages/         # Home.tsx, PostSwap.tsx
│   │   ├── api/           # fetchSwaps.ts, postSwap.ts
│   │   └── App.tsx
│   └── vite.config.ts
│
├── server/                # Express + MongoDB
│   ├── models/            # SkillSwap.js
│   ├── routes/            # skillSwapRoutes.js
│   ├── controllers/       # skillSwapController.js
│   ├── server.js
│   └── .env
```

---

## ✅ Bonus Features (Optional)

- Form validation (required fields, client-side)
- Simple subject filtering on Home page
- Confirmation toast on post
- Display total number of swaps

---

## 📦 Deliverables

- Fully working full-stack app
- Clean UI with responsive layout
- MongoDB integration and tested API endpoints
- Code is modular and developer-friendly

---

Enjoy building SkillSwap and help empower student collaboration! 🎓
