import React from 'react';

interface ErrorStateProps {
  message: string;
  details?: string;
  retryAction?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message, details, retryAction }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h3 className="text-xl font-medium text-gray-800 mb-2">{message}</h3>
      {details && (
        <p className="text-gray-600 mb-4 max-w-md">{details}</p>
      )}
      {retryAction && (
        <button
          onClick={retryAction}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;