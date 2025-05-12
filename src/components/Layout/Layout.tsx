import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Toast from '../Common/Toast';
import { useToast } from '../../context/ToastContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { toast } = useToast();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};

export default Layout;