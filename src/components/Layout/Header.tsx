import React from 'react';
import { Beaker, Clipboard } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Clipboard className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-800">TestReview</span>
            </div>
            <div className="hidden md:flex items-center h-6 border-l border-gray-300 pl-3">
              <span className="text-sm text-gray-500">AI-Powered Test Case Review</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm">
              <Beaker className="h-4 w-4 mr-1" />
              <span>AI-Assisted</span>
            </div>
            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-sm font-medium text-purple-700">QA</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;