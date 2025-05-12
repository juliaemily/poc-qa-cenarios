import React from 'react';
import { TestCase } from '../../types/testCase';

interface TestCaseViewProps {
  testCase: TestCase;
}

const TestCaseView: React.FC<TestCaseViewProps> = ({ testCase }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">Title</h3>
        <p className="text-gray-800 bg-gray-50 p-3 rounded-md">{testCase.title}</p>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">Objective</h3>
        <p className="text-gray-800 bg-gray-50 p-3 rounded-md whitespace-pre-line">{testCase.objective}</p>
      </div>
      
      {testCase.prerequisites && (
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Prerequisites</h3>
          <p className="text-gray-800 bg-gray-50 p-3 rounded-md whitespace-pre-line">{testCase.prerequisites}</p>
        </div>
      )}
      
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">Steps</h3>
        <ol className="list-decimal list-inside space-y-2">
          {testCase.steps.map((step, index) => (
            <li key={index} className="text-gray-800 bg-gray-50 p-3 rounded-md">
              {step}
            </li>
          ))}
        </ol>
      </div>
      
      {testCase.expectedResults && (
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Expected Results</h3>
          <p className="text-gray-800 bg-gray-50 p-3 rounded-md whitespace-pre-line">{testCase.expectedResults}</p>
        </div>
      )}
    </div>
  );
};

export default TestCaseView;