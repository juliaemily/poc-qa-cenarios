import { TestCase } from '../types/testCase';

// Environment variables would be used in production
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://juliaemilyqa.app.n8n.cloud/webhook-test';
const FETCH_WEBHOOK_URL = `${API_BASE_URL}/send-test-cases`;
const APPROVAL_WEBHOOK_URL = `${API_BASE_URL}/approve-test-case`;
const REJECTION_WEBHOOK_URL = `${API_BASE_URL}/reject-test-case`;

export const fetchTestCasesFromWebhook = async (): Promise<TestCase[]> => {
  try {
    if (process.env.NODE_ENV === 'development') {
      return getMockTestCases();
    }
    
    const response = await fetch(FETCH_WEBHOOK_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.testCases || [];
  } catch (error) {
    console.error('Error fetching test cases:', error);
    throw error;
  }
};

export const submitApprovalToWebhook = async (testCase: TestCase): Promise<void> => {
  try {
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return;
    }
    
    const payload = {
      testCase: {
        ...testCase,
        metadata: {
          approvedAt: new Date().toISOString(),
          status: 'APPROVED'
        }
      },
      jira: {
        parentIssueKey: testCase.jiraId,
        issueType: 'Sub-task',
        labels: ['ai-generated', 'qa-approved']
      }
    };

    const response = await fetch(APPROVAL_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error submitting approval:', error);
    throw error;
  }
};

export const submitRejectionToWebhook = async (testCase: TestCase, reason: string): Promise<void> => {
  try {
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return;
    }
    
    const payload = {
      testCase: {
        ...testCase,
        metadata: {
          rejectedAt: new Date().toISOString(),
          status: 'REJECTED',
          rejectionReason: reason
        }
      },
      jira: {
        issueKey: testCase.jiraId,
        comment: `Test case rejected: ${reason}`
      }
    };

    const response = await fetch(REJECTION_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error submitting rejection:', error);
    throw error;
  }
};

// Mock data for development environment
const getMockTestCases = (): TestCase[] => {
  return [
    {
      id: '1',
      jiraId: 'QA-123',
      title: 'User Login Functionality',
      objective: 'Verify that users can successfully log in with valid credentials and that appropriate error messages are shown for invalid attempts.',
      prerequisites: 'User account exists in the system\nApplication is accessible',
      steps: [
        'Navigate to the login page',
        'Enter valid username and password',
        'Click the "Login" button',
        'Verify user is redirected to the dashboard',
        'Log out and return to login page',
        'Enter invalid credentials',
        'Click the "Login" button',
        'Verify appropriate error message is displayed'
      ],
      expectedResults: 'User can successfully log in with valid credentials\nUser sees appropriate error message with invalid credentials',
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      jiraId: 'QA-124',
      title: 'Product Search Functionality',
      objective: 'Verify that users can search for products using different criteria and receive relevant results.',
      prerequisites: 'Multiple products exist in the system\nUser is logged in',
      steps: [
        'Navigate to the product search page',
        'Enter a product name in the search field',
        'Click the search button',
        'Verify relevant results are displayed',
        'Clear the search field',
        'Use the category filter to select a specific category',
        'Click the search button',
        'Verify results are filtered by the selected category'
      ],
      expectedResults: 'Search by product name returns relevant results\nFiltering by category shows only products from that category',
      createdAt: new Date().toISOString()
    },
    {
      id: '3',
      jiraId: 'QA-125',
      title: 'User Account Settings Update',
      objective: 'Verify that users can update their account settings and that changes are saved correctly.',
      prerequisites: 'User is logged in\nUser has access to account settings',
      steps: [
        'Navigate to account settings page',
        'Update user profile information (name, email, etc.)',
        'Save changes',
        'Verify success message is displayed',
        'Refresh the page',
        'Verify updated information is still displayed',
        'Update password',
        'Verify password change is successful'
      ],
      expectedResults: 'User profile information is updated and persisted\nPassword can be changed successfully',
      createdAt: new Date().toISOString()
    }
  ];
};
