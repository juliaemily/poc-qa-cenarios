import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div className="mb-2 md:mb-0">
            © {new Date().getFullYear()} TestReview - AI-Powered Test Case Management
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-600 transition-colors duration-200">Help</a>
            <a href="#" className="hover:text-blue-600 transition-colors duration-200">Documentation</a>
            <a href="#" className="hover:text-blue-600 transition-colors duration-200">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;