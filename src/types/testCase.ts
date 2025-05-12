export interface TestCase {
  id: string;
  jiraId: string;
  title: string;
  objective: string;
  prerequisites: string;
  steps: string[];
  expectedResults: string;
  createdAt?: string;
  status?: 'PENDING' | 'APPROVED' | 'REJECTED';
  rejectionReason?: string;
}

export interface RejectionReason {
  id: string;
  label: string;
  description: string;
}

export const REJECTION_REASONS: RejectionReason[] = [
  {
    id: 'incomplete',
    label: 'Incomplete Test Case',
    description: 'The test case is missing critical information or steps'
  },
  {
    id: 'unclear',
    label: 'Unclear Requirements',
    description: 'The test case objectives or steps are not clearly defined'
  },
  {
    id: 'duplicate',
    label: 'Duplicate Test Case',
    description: 'This scenario is already covered by another test case'
  },
  {
    id: 'irrelevant',
    label: 'Not Relevant',
    description: 'The test case does not align with the feature requirements'
  },
  {
    id: 'complex',
    label: 'Too Complex',
    description: 'The test case needs to be broken down into smaller scenarios'
  }
];