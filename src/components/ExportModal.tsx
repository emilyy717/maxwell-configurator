
import React, { useState, useEffect } from 'react';

// The camera config is now an array of any objects, as its structure is defined in App.tsx
interface ExportModalProps {
  cameraConfig: any[];
  onClose: () => void;
}

const ExportModal: React.FC<ExportModalProps> = ({ cameraConfig, onClose }) => {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');
  const jsonConfig = JSON.stringify(cameraConfig, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonConfig).then(() => {
      setCopyStatus('copied');
    });
  };

  useEffect(() => {
    if (copyStatus === 'copied') {
      const timer = setTimeout(() => setCopyStatus('idle'), 2000);
      return () => clearTimeout(timer);
    }
  }, [copyStatus]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-cyan-400">Generated Configuration</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
        </div>
        
        <div className="p-4 flex-grow overflow-y-auto">
          <pre className="bg-gray-900 text-green-300 p-4 rounded-md text-sm whitespace-pre-wrap break-all">
            <code>{jsonConfig}</code>
          </pre>
        </div>
        
        <div className="flex justify-end items-center p-4 border-t border-gray-700 space-x-4">
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors w-32"
          >
            {copyStatus === 'copied' ? 'Copied!' : 'Copy JSON'}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-md transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
