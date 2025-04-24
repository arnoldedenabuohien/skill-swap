# SkillSwap

A full-stack web application that allows students to exchange academic support. Students can offer help in subjects they're confident with and request help in subjects they need assistance with.

## Features

- View all skill swap posts
- Create new skill swap posts
- Responsive design with dark mode support
- Modern UI with Tailwind CSS

## Tech Stack

- **Frontend:** Vite + React + TypeScript
- **Styling:** TailwindCSS
- **Backend:** Express.js (Node.js)
- **Database:** MongoDB (via Mongoose)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd skillswap
```

2. Install dependencies:
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Create a `.env` file in the server directory with the following content:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/skillswap
PORT=5000
```

Replace `<username>` and `<password>` with your MongoDB credentials.

## Running the Application

1. Start the backend server:
```bash
cd server
npm run dev
```

2. Start the frontend development server:
```bash
cd client
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
skill-swap/
├── client/                # Vite + React
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── api/           # API service
│   │   └── App.tsx        # Main app component
│   └── vite.config.ts
│
├── server/                # Express + MongoDB
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── controllers/       # Route controllers
│   └── server.js          # Server entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 