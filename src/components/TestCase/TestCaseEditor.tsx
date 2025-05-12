import React from 'react';
import { TestCase } from '../../types/testCase';

interface TestCaseEditorProps {
  testCase: TestCase;
  onChange: (updatedTestCase: TestCase) => void;
  onSave: () => void;
  onCancel: () => void;
}

const TestCaseEditor: React.FC<TestCaseEditorProps> = ({ 
  testCase, 
  onChange, 
  onSave, 
  onCancel 
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onChange({
      ...testCase,
      [name]: value,
    });
  };

  const handleStepChange = (index: number, value: string) => {
    const updatedSteps = [...testCase.steps];
    updatedSteps[index] = value;
    onChange({
      ...testCase,
      steps: updatedSteps,
    });
  };

  const addStep = () => {
    onChange({
      ...testCase,
      steps: [...testCase.steps, ''],
    });
  };

  const removeStep = (index: number) => {
    const updatedSteps = testCase.steps.filter((_, i) => i !== index);
    onChange({
      ...testCase,
      steps: updatedSteps,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={testCase.title}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      
      <div>
        <label htmlFor="objective" className="block text-sm font-medium text-gray-700 mb-1">
          Objective
        </label>
        <textarea
          id="objective"
          name="objective"
          value={testCase.objective}
          onChange={handleInputChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      
      <div>
        <label htmlFor="prerequisites" className="block text-sm font-medium text-gray-700 mb-1">
          Prerequisites
        </label>
        <textarea
          id="prerequisites"
          name="prerequisites"
          value={testCase.prerequisites}
          onChange={handleInputChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Steps
          </label>
          <button
            type="button"
            onClick={addStep}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Step
          </button>
        </div>
        
        <div className="space-y-3">
          {testCase.steps.map((step, index) => (
            <div key={index} className="flex gap-2">
              <div className="flex-grow">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-500">{index + 1}.</span>
                  </div>
                  <input
                    type="text"
                    value={step}
                    onChange={(e) => handleStepChange(index, e.target.value)}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter test step"
                    required
                  />
                </div>
              </div>
              {testCase.steps.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeStep(index)}
                  className="inline-flex items-center p-2 border border-transparent rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <label htmlFor="expectedResults" className="block text-sm font-medium text-gray-700 mb-1">
          Expected Results
        </label>
        <textarea
          id="expectedResults"
          name="expectedResults"
          value={testCase.expectedResults}
          onChange={handleInputChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </form>
  );
};

export default TestCaseEditor;