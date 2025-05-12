import React from 'react';

interface LoadingStateProps {
  message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-gray-200"></div>
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
      </div>
      <p className="text-lg text-gray-600">{message}</p>
    </div>
  );
};

export default LoadingState;