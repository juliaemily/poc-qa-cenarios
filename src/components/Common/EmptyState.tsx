import React from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  title, 
  description, 
  actionLabel, 
  onAction 
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="9" y1="9" x2="15" y2="15" />
          <line x1="15" y1="9" x2="9" y2="15" />
        </svg>
      </div>
      <h3 className="text-xl font-medium text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4 max-w-md">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;