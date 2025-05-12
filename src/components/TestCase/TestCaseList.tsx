import React from 'react';
import TestCaseCard from './TestCaseCard';
import { TestCase } from '../../types/testCase';

interface TestCaseListProps {
  testCases: TestCase[];
}

const TestCaseList: React.FC<TestCaseListProps> = ({ testCases }) => {
  return (
    <div className="space-y-6">
      {testCases.map((testCase) => (
        <TestCaseCard key={testCase.id} testCase={testCase} />
      ))}
    </div>
  );
};

export default TestCaseList;