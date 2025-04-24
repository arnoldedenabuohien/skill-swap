import { useState } from 'react';
import { SkillSwap, deleteSwap } from '../api/skillSwapApi';
import { InterestedUserForm } from './InterestedUserForm';
import { EditSwapForm } from './EditSwapForm';

interface SwapCardProps {
  swap: SkillSwap;
  onUpdate?: () => void;
  isOwner?: boolean;
}

export const SwapCard = ({ swap, onUpdate, isOwner = false }: SwapCardProps) => {
  const [showInterestForm, setShowInterestForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpdate = () => {
    console.log('Updating swap card');
    if (typeof onUpdate === 'function') {
      onUpdate();
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this skill swap?')) {
      return;
    }

    try {
      setIsDeleting(true);
      await deleteSwap(swap._id);
      handleUpdate();
    } catch (err) {
      console.error('Error deleting swap:', err);
      alert('Failed to delete skill swap. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {swap.studentName}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {swap.department}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {swap.status}
          </span>
          {isOwner && (
            <div className="flex space-x-2">
              <button
                onClick={() => setShowEditForm(true)}
                className="p-1 text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                title="Edit"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="p-1 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                title="Delete"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Skills I Can Help With</h4>
          <p className="mt-1 text-gray-900 dark:text-white">{swap.canHelpWith}</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Skills I Need Help With</h4>
          <p className="mt-1 text-gray-900 dark:text-white">{swap.needsHelpWith}</p>
        </div>

        {swap.notes && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Additional Notes</h4>
            <p className="mt-1 text-gray-900 dark:text-white">{swap.notes}</p>
          </div>
        )}

        {swap.interestedUsers && swap.interestedUsers.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Interested Users ({swap.interestedUsers.length})
            </h4>
            <ul className="mt-2 space-y-2">
              {swap.interestedUsers.map((user, index) => (
                <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                  {user.name} - {user.preferredTime} at {user.preferredLocation}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => setShowInterestForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Express Interest
        </button>
      </div>

      {showInterestForm && (
        <InterestedUserForm
          swap={swap}
          onClose={() => setShowInterestForm(false)}
          onSuccess={handleUpdate}
        />
      )}

      {showEditForm && (
        <EditSwapForm
          swap={swap}
          onClose={() => setShowEditForm(false)}
          onSuccess={handleUpdate}
        />
      )}
    </div>
  );
}; 