import React from 'react';
import { TestCaseReviewProvider } from './context/TestCaseReviewContext';
import Layout from './components/Layout/Layout';
import TestCaseReviewPage from './pages/TestCaseReviewPage';

function App() {
  return (
    <TestCaseReviewProvider>
      <Layout>
        <TestCaseReviewPage />
      </Layout>
    </TestCaseReviewProvider>
  );
}

export default App;