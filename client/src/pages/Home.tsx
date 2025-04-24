import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SwapCard } from '../components/SwapCard';
import { fetchSwaps, SkillSwap } from '../api/skillSwapApi';

export const Home = () => {
  const [swaps, setSwaps] = useState<SkillSwap[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    const loadSwaps = async () => {
      try {
        const data = await fetchSwaps();
        setSwaps(data);
      } catch (err) {
        setError('Failed to load skill swaps. Please try again later.');
        console.error('Error loading swaps:', err);
      } finally {
        setLoading(false);
      }
    };

    // Get current user from localStorage (for demo purposes)
    // In a real app, this would come from authentication
    const user = localStorage.getItem('currentUser');
    setCurrentUser(user);

    loadSwaps();
  }, []);

  const handleInterest = (swap: SkillSwap) => {
    alert(`Interest registered for swap: ${swap.canHelpWith} ↔ ${swap.needsHelpWith}`);
  };

  const handleUpdate = () => {
    console.log('Refreshing swaps list');
    // Refresh the swaps list
    const loadSwaps = async () => {
      try {
        const data = await fetchSwaps();
        console.log('Fetched swaps:', data);
        setSwaps(data);
      } catch (err) {
        setError('Failed to load skill swaps. Please try again later.');
        console.error('Error loading swaps:', err);
      }
    };

    loadSwaps();
  };

  // Function to check if the current user is the owner of a swap
  const isOwnerOfSwap = (swap: SkillSwap) => {
    // For demo purposes, we'll consider a user the owner if their name matches the studentName
    // In a real app, this would be based on user IDs
    return currentUser === swap.studentName;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Skill Swap Board
        </h1>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <label htmlFor="currentUser" className="mr-2 text-sm text-gray-600 dark:text-gray-400">
              Current User:
            </label>
            <select
              id="currentUser"
              value={currentUser || ''}
              onChange={(e) => {
                const value = e.target.value || null;
                setCurrentUser(value);
                localStorage.setItem('currentUser', value || '');
              }}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="">Select User</option>
              <option value="John Doe">John Doe</option>
              <option value="Jane Smith">Jane Smith</option>
              <option value="Alex Johnson">Alex Johnson</option>
            </select>
          </div>
          <Link
            to="/post"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Post a Swap
          </Link>
        </div>
      </div>

      {swaps.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No skill swaps available yet. Be the first to post one!
        </p>
      ) : (
        <div className="space-y-4">
          {swaps.map((swap) => (
            <SwapCard
              key={swap._id}
              swap={swap}
              onUpdate={handleUpdate}
              isOwner={isOwnerOfSwap(swap)}
            />
          ))}
        </div>
      )}
    </div>
  );
}; 