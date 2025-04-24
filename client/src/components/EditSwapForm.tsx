import { useState } from 'react';
import { SkillSwap, updateSwap } from '../api/skillSwapApi';

interface EditSwapFormProps {
  swap: SkillSwap;
  onClose: () => void;
  onSuccess: () => void;
}

export const EditSwapForm = ({ swap, onClose, onSuccess }: EditSwapFormProps) => {
  const [formData, setFormData] = useState({
    studentName: swap.studentName,
    department: swap.department,
    canHelpWith: swap.canHelpWith,
    needsHelpWith: swap.needsHelpWith,
    notes: swap.notes || ''
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
      
      // Validate form data
      if (!formData.studentName || !formData.department || !formData.canHelpWith || !formData.needsHelpWith) {
        throw new Error('Please fill in all required fields');
      }
      
      if (!swap._id) {
        throw new Error('Invalid swap ID');
      }
      
      // Log the exact data being sent
      const swapData = {
        studentName: formData.studentName.trim(),
        department: formData.department.trim(),
        canHelpWith: formData.canHelpWith.trim(),
        needsHelpWith: formData.needsHelpWith.trim(),
        notes: formData.notes.trim()
      };
      
      console.log('Sending data to server:', swapData);
      
      await updateSwap(swap._id, swapData);
      console.log('Swap updated successfully');
      
      // Call onSuccess if it exists
      if (typeof onSuccess === 'function') {
        onSuccess();
      }
      
      onClose();
    } catch (err) {
      console.error('Error updating swap:', err);
      if (err instanceof Error) {
        setError(`Failed to update swap: ${err.message}`);
      } else {
        setError('Failed to update swap. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
            Edit Skill Swap
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
            <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Your Name
            </label>
            <input
              type="text"
              id="studentName"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Your Department
            </label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label htmlFor="canHelpWith" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Skills I Can Help With
            </label>
            <input
              type="text"
              id="canHelpWith"
              name="canHelpWith"
              value={formData.canHelpWith}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label htmlFor="needsHelpWith" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Skills I Need Help With
            </label>
            <input
              type="text"
              id="needsHelpWith"
              name="needsHelpWith"
              value={formData.needsHelpWith}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Additional Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
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
              {isSubmitting ? 'Updating...' : 'Update Swap'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 