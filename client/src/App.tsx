import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { PostSwap } from './pages/PostSwap';
import { AdminPage } from './pages/AdminPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <nav className="bg-white dark:bg-gray-800 shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
                SkillSwap
              </Link>
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Home
                </Link>
                <Link
                  to="/post"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Post Swap
                </Link>
                <Link
                  to="/admin"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Admin Panel
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post" element={<PostSwap />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>

        <footer className="bg-white dark:bg-gray-800 shadow-md mt-8">
          <div className="container mx-auto px-4 py-6">
            <p className="text-center text-gray-600 dark:text-gray-400">
              © 2024 SkillSwap. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App; 