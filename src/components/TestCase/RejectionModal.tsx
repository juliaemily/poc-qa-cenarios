import React, { useState } from 'react';
import { REJECTION_REASONS } from '../../types/testCase';

interface RejectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReject: (reason: string) => void;
}

const RejectionModal: React.FC<RejectionModalProps> = ({ isOpen, onClose, onReject }) => {
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reason = selectedReason === 'custom' ? customReason : 
      REJECTION_REASONS.find(r => r.id === selectedReason)?.description || '';
    onReject(reason);
    setSelectedReason('');
    setCustomReason('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Reject Test Case
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Rejection Reason
            </label>
            <div className="space-y-2">
              {REJECTION_REASONS.map((reason) => (
                <label key={reason.id} className="flex items-start space-x-3 p-2 rounded-md hover:bg-gray-50">
                  <input
                    type="radio"
                    name="rejectionReason"
                    value={reason.id}
                    checked={selectedReason === reason.id}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="mt-1 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <div>
                    <div className="font-medium text-gray-800">{reason.label}</div>
                    <div className="text-sm text-gray-500">{reason.description}</div>
                  </div>
                </label>
              ))}
              <label className="flex items-start space-x-3 p-2 rounded-md hover:bg-gray-50">
                <input
                  type="radio"
                  name="rejectionReason"
                  value="custom"
                  checked={selectedReason === 'custom'}
                  onChange={(e) => setSelectedReason(e.target.value)}
                  className="mt-1 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-800">Custom Reason</div>
                  <textarea
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    placeholder="Enter custom rejection reason..."
                    className={`mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      selectedReason !== 'custom' ? 'opacity-50' : ''
                    }`}
                    disabled={selectedReason !== 'custom'}
                    rows={3}
                  />
                </div>
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedReason || (selectedReason === 'custom' && !customReason.trim())}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reject Test Case
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RejectionModal;