import React, { useEffect } from 'react';
import TestCaseList from '../components/TestCase/TestCaseList';
import { useTestCaseReview } from '../context/TestCaseReviewContext';
import LoadingState from '../components/Common/LoadingState';
import ErrorState from '../components/Common/ErrorState';
import EmptyState from '../components/Common/EmptyState';

const TestCaseReviewPage: React.FC = () => {
  const { 
    testCases, 
    selectedTestCases,
    loading, 
    error, 
    fetchTestCases,
    approveBulkTestCases,
    toggleAllTestCases,
    clearSelection
  } = useTestCaseReview();

  useEffect(() => {
    fetchTestCases();
  }, [fetchTestCases]);

  const handleBulkApprove = async () => {
    const selectedCases = testCases.filter(tc => selectedTestCases.has(tc.id));
    await approveBulkTestCases(selectedCases);
  };

  if (loading && testCases.length === 0) {
    return <LoadingState message="Loading AI-generated test cases..." />;
  }

  if (error) {
    return (
      <ErrorState 
        message="Failed to load test cases" 
        details={error} 
        retryAction={fetchTestCases} 
      />
    );
  }

  if (!testCases || testCases.length === 0) {
    return (
      <EmptyState 
        title="No Test Cases Available" 
        description="There are no AI-generated test cases to review at this time." 
        actionLabel="Refresh" 
        onAction={fetchTestCases} 
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Test Case Review</h1>
            <p className="text-gray-600">
              Review, edit, and approve AI-generated test cases before they're created as subtasks in Jira.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedTestCases.size === testCases.length}
                onChange={toggleAllTestCases}
                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Select All</span>
            </label>
            {selectedTestCases.size > 0 && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={clearSelection}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  Clear Selection ({selectedTestCases.size})
                </button>
                <button
                  onClick={handleBulkApprove}
                  disabled={loading}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    `Approve Selected (${selectedTestCases.size})`
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <TestCaseList testCases={testCases} />
    </div>
  );
};

export default TestCaseReviewPage;