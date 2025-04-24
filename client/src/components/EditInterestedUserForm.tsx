import { useState } from 'react';
import { SkillSwap, updateInterestedUser } from '../api/skillSwapApi';

interface EditInterestedUserFormProps {
  swap: SkillSwap;
  userIndex: number;
  onClose: () => void;
  onSuccess: () => void;
}

export const EditInterestedUserForm = ({ swap, userIndex, onClose, onSuccess }: EditInterestedUserFormProps) => {
  const interestedUser = swap.interestedUsers[userIndex];
  
  const [formData, setFormData] = useState({
    name: interestedUser.name,
    email: interestedUser.email,
    preferredTime: interestedUser.preferredTime || '',
    preferredLocation: interestedUser.preferredLocation || ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      console.log('Submitting form data:', formData);
      console.log('Swap ID:', swap._id);
      console.log('User Index:', userIndex);
      
      // Validate form data
      if (!formData.name || !formData.email) {
        throw new Error('Please fill in all required fields');
      }
      
      if (!swap._id) {
        throw new Error('Invalid swap ID');
      }
      
      // Log the exact data being sent
      const userData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        preferredTime: formData.preferredTime.trim(),
        preferredLocation: formData.preferredLocation.trim()
      };
      
      console.log('Sending data to server:', userData);
      
      await updateInterestedUser(swap._id, userIndex, userData);
      console.log('Interested user updated successfully');
      
      // Call onSuccess if it exists
      if (typeof onSuccess === 'function') {
        onSuccess();
      }
      
      onClose();
    } catch (err) {
      console.error('Error updating interested user:', err);
      if (err instanceof Error) {
        setError(`Failed to update interested user: ${err.message}`);
      } else {
        setError('Failed to update interested user. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Edit Interested User
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Preferred Time (Optional)
            </label>
            <input
              type="text"
              id="preferredTime"
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleChange}
              placeholder="e.g., Weekends, After 5 PM"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label htmlFor="preferredLocation" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Preferred Location (Optional)
            </label>
            <input
              type="text"
              id="preferredLocation"
              name="preferredLocation"
              value={formData.preferredLocation}
              onChange={handleChange}
              placeholder="e.g., Library, Coffee Shop"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Updating...' : 'Update Information'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 