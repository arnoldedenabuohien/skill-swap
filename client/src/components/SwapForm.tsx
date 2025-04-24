import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSwap } from '../api/skillSwapApi';

export const SwapForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentName: '',
    department: '',
    canHelpWith: '',
    needsHelpWith: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createSwap(formData);
      navigate('/');
    } catch (error) {
      console.error('Error creating swap:', error);
      alert('Failed to create swap. Please try again.');
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
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6">
      <div className="space-y-6">
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
            Can Help With
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
            Needs Help With
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
            Notes (Optional)
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

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create Swap
          </button>
        </div>
      </div>
    </form>
  );
}; 