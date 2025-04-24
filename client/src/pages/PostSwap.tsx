import { SwapForm } from '../components/SwapForm';

export const PostSwap = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        Post a New Skill Swap
      </h1>
      <SwapForm />
    </div>
  );
}; 