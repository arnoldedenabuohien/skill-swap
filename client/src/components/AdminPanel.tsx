import { useState, useEffect } from 'react';
import { SkillSwap, fetchSwaps, deleteSwap, deleteInterestedUser } from '../api/skillSwapApi';
import { EditSwapForm } from './EditSwapForm';
import { EditInterestedUserForm } from './EditInterestedUserForm';

export const AdminPanel = () => {
  const [swaps, setSwaps] = useState<SkillSwap[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingSwap, setEditingSwap] = useState<SkillSwap | null>(null);
  const [editingUser, setEditingUser] = useState<{ swap: SkillSwap; userIndex: number } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Load swaps on component mount
  useEffect(() => {
    loadSwaps();
    
    // Check if user is admin (for demo purposes, we'll use localStorage)
    // In a real app, this would be handled by authentication
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
  }, []);

  const loadSwaps = async () => {
    try {
      setLoading(true);
      const data = await fetchSwaps();
      setSwaps(data);
      setError(null);
    } catch (err) {
      console.error('Error loading swaps:', err);
      setError('Failed to load skill swaps. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSwap = async (swapId: string) => {
    if (!window.confirm('Are you sure you want to delete this skill swap?')) {
      return;
    }

    try {
      await deleteSwap(swapId);
      setSwaps(swaps.filter(swap => swap._id !== swapId));
    } catch (err) {
      console.error('Error deleting swap:', err);
      alert('Failed to delete skill swap. Please try again.');
    }
  };

  const handleDeleteInterestedUser = async (swapId: string, userIndex: number) => {
    if (!window.confirm('Are you sure you want to remove this interested user?')) {
      return;
    }

    try {
      await deleteInterestedUser(swapId, userIndex);
      await loadSwaps();
    } catch (err) {
      console.error('Error deleting interested user:', err);
      alert('Failed to remove interested user. Please try again.');
    }
  };

  const handleEditSwap = (swap: SkillSwap) => {
    setEditingSwap(swap);
  };

  const handleEditUser = (swap: SkillSwap, userIndex: number) => {
    setEditingUser({ swap, userIndex });
  };

  const handleSwapUpdated = () => {
    loadSwaps();
    setEditingSwap(null);
  };

  const handleUserUpdated = () => {
    loadSwaps();
    setEditingUser(null);
  };

  const toggleAdminStatus = () => {
    const newStatus = !isAdmin;
    setIsAdmin(newStatus);
    localStorage.setItem('isAdmin', String(newStatus));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {isAdmin ? 'Admin Mode' : 'User Mode'}
          </span>
          <button
            onClick={toggleAdminStatus}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              isAdmin
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {isAdmin ? 'Switch to User Mode' : 'Switch to Admin Mode'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Can Help With
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Needs Help With
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Posted Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Interested Users
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {swaps.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    No skill swaps found
                  </td>
                </tr>
              ) : (
                swaps.map((swap) => (
                  <tr key={swap._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {swap.studentName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {swap.canHelpWith}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {swap.needsHelpWith}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(swap.postedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {swap.interestedUsers.length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditSwap(swap)}
                          className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteSwap(swap._id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interested Users Table */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Interested Users</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Skill Swap Details
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Interested User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Contact Info
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Preferences
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {swaps.map((swap) => (
                swap.interestedUsers.map((user, userIndex) => (
                  <tr key={`${swap._id}-${userIndex}`} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {swap.studentName}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {swap.department}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <div>Can help with: {swap.canHelpWith}</div>
                        <div>Needs help with: {swap.needsHelpWith}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Interested since: {new Date(swap.postedAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {user.preferredTime && (
                          <div className="mb-1">
                            <span className="font-medium">Time:</span> {user.preferredTime}
                          </div>
                        )}
                        {user.preferredLocation && (
                          <div>
                            <span className="font-medium">Location:</span> {user.preferredLocation}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {isAdmin ? (
                        <>
                          <button
                            onClick={() => handleEditUser(swap, userIndex)}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteInterestedUser(swap._id, userIndex)}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          >
                            Delete
                          </button>
                        </>
                      ) : (
                        <span className="text-gray-500 dark:text-gray-400">View Only</span>
                      )}
                    </td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editingSwap && (
        <EditSwapForm
          swap={editingSwap}
          onClose={() => setEditingSwap(null)}
          onSuccess={handleSwapUpdated}
        />
      )}

      {editingUser && (
        <EditInterestedUserForm
          swap={editingUser.swap}
          userIndex={editingUser.userIndex}
          onClose={() => setEditingUser(null)}
          onSuccess={handleUserUpdated}
        />
      )}
    </div>
  );
}; 