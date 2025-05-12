import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { TestCase } from '../../types/testCase';
import TestCaseView from './TestCaseView';
import TestCaseEditor from './TestCaseEditor';
import RejectionModal from './RejectionModal';
import { useTestCaseReview } from '../../context/TestCaseReviewContext';

interface TestCaseCardProps {
  testCase: TestCase;
}

const TestCaseCard: React.FC<TestCaseCardProps> = ({ testCase }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [editedTestCase, setEditedTestCase] = useState<TestCase>(testCase);
  const { 
    approveTestCase,
    rejectTestCase, 
    loading,
    selectedTestCases,
    toggleTestCaseSelection 
  } = useTestCaseReview();

  const handleEdit = () => {
    setIsEditing(true);
    setIsExpanded(true);
  };

  const handleCancel = () => {
    setEditedTestCase(testCase);
    setIsEditing(false);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleApprove = async () => {
    await approveTestCase(isEditing ? editedTestCase : testCase);
  };

  const handleReject = async (reason: string) => {
    await rejectTestCase(testCase, reason);
    setShowRejectionModal(false);
  };

  const handleChange = (updatedTestCase: TestCase) => {
    setEditedTestCase(updatedTestCase);
  };

  const isSelected = selectedTestCases.has(testCase.id);

  return (
    <>
      <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border ${isSelected ? 'border-blue-500' : 'border-gray-100'}`}>
        <div className="bg-blue-50 border-b border-blue-100 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => toggleTestCaseSelection(testCase.id)}
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
              <h2 className="text-xl font-semibold text-gray-800">
                {isEditing ? 'Editing Test Case' : 'Test Case Review'}
              </h2>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500">
              Jira Issue: <span className="font-medium">{testCase.jiraId}</span>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-blue-100 rounded-full transition-colors duration-200"
            >
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="p-6">
            {isEditing ? (
              <TestCaseEditor 
                testCase={editedTestCase} 
                onChange={handleChange} 
                onSave={handleSave} 
                onCancel={handleCancel} 
              />
            ) : (
              <TestCaseView testCase={testCase} />
            )}

            <div className="mt-6 flex justify-end space-x-4 border-t border-gray-100 pt-4">
              {isEditing ? (
                <>
                  <button
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200"
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                    onClick={handleSave}
                    disabled={loading}
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors duration-200"
                    onClick={() => setShowRejectionModal(true)}
                    disabled={loading}
                  >
                    Reject
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200"
                    onClick={handleEdit}
                    disabled={loading}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200 flex items-center gap-2"
                    onClick={handleApprove}
                    disabled={loading}
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
                      "Approve & Create in Jira"
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      
      <RejectionModal
        isOpen={showRejectionModal}
        onClose={() => setShowRejectionModal(false)}
        onReject={handleReject}
      />
    </>
  );
};

export default TestCaseCard;