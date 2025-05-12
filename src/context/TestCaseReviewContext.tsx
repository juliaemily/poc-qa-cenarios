import React, { createContext, useContext, useState, useCallback } from 'react';
import { TestCase } from '../types/testCase';
import { fetchTestCasesFromWebhook, submitApprovalToWebhook, submitRejectionToWebhook } from '../services/webhookService';
import { useToast } from './ToastContext';

interface TestCaseReviewContextType {
  testCases: TestCase[];
  selectedTestCases: Set<string>;
  loading: boolean;
  error: string | null;
  fetchTestCases: () => Promise<void>;
  approveTestCase: (testCase: TestCase) => Promise<void>;
  rejectTestCase: (testCase: TestCase, reason: string) => Promise<void>;
  approveBulkTestCases: (testCases: TestCase[]) => Promise<void>;
  toggleTestCaseSelection: (testCaseId: string) => void;
  toggleAllTestCases: () => void;
  clearSelection: () => void;
}

const TestCaseReviewContext = createContext<TestCaseReviewContextType | undefined>(undefined);

export const TestCaseReviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [selectedTestCases, setSelectedTestCases] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  const fetchTestCases = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchTestCasesFromWebhook();
      setTestCases(data);
      setSelectedTestCases(new Set());
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      showToast(`Failed to fetch test cases: ${errorMessage}`, 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const approveTestCase = useCallback(async (testCase: TestCase) => {
    setLoading(true);
    setError(null);
    
    try {
      await submitApprovalToWebhook(testCase);
      setTestCases(prevTestCases => 
        prevTestCases.filter(tc => tc.id !== testCase.id)
      );
      setSelectedTestCases(prev => {
        const next = new Set(prev);
        next.delete(testCase.id);
        return next;
      });
      showToast('Test case approved and created in Jira', 'success');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      showToast(`Failed to approve test case: ${errorMessage}`, 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const rejectTestCase = useCallback(async (testCase: TestCase, reason: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await submitRejectionToWebhook(testCase, reason);
      setTestCases(prevTestCases => 
        prevTestCases.filter(tc => tc.id !== testCase.id)
      );
      setSelectedTestCases(prev => {
        const next = new Set(prev);
        next.delete(testCase.id);
        return next;
      });
      showToast('Test case rejected', 'info');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      showToast(`Failed to reject test case: ${errorMessage}`, 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const approveBulkTestCases = useCallback(async (selectedCases: TestCase[]) => {
    setLoading(true);
    setError(null);
    
    try {
      await Promise.all(selectedCases.map(testCase => submitApprovalToWebhook(testCase)));
      setTestCases(prevTestCases => 
        prevTestCases.filter(tc => !selectedTestCases.has(tc.id))
      );
      setSelectedTestCases(new Set());
      showToast(`${selectedCases.length} test cases approved and created in Jira`, 'success');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      showToast(`Failed to approve test cases: ${errorMessage}`, 'error');
    } finally {
      setLoading(false);
    }
  }, [selectedTestCases, showToast]);

  const toggleTestCaseSelection = useCallback((testCaseId: string) => {
    setSelectedTestCases(prev => {
      const next = new Set(prev);
      if (next.has(testCaseId)) {
        next.delete(testCaseId);
      } else {
        next.add(testCaseId);
      }
      return next;
    });
  }, []);

  const toggleAllTestCases = useCallback(() => {
    setSelectedTestCases(prev => {
      if (prev.size === testCases.length) {
        return new Set();
      }
      return new Set(testCases.map(tc => tc.id));
    });
  }, [testCases]);

  const clearSelection = useCallback(() => {
    setSelectedTestCases(new Set());
  }, []);

  return (
    <TestCaseReviewContext.Provider
      value={{
        testCases,
        selectedTestCases,
        loading,
        error,
        fetchTestCases,
        approveTestCase,
        rejectTestCase,
        approveBulkTestCases,
        toggleTestCaseSelection,
        toggleAllTestCases,
        clearSelection
      }}
    >
      {children}
    </TestCaseReviewContext.Provider>
  );
};

export const useTestCaseReview = (): TestCaseReviewContextType => {
  const context = useContext(TestCaseReviewContext);
  if (context === undefined) {
    throw new Error('useTestCaseReview must be used within a TestCaseReviewProvider');
  }
  return context;
};