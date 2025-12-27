// components/DeleteModal.jsx
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa';

export default function DeleteModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full mx-auto mb-4">
            <FaExclamationTriangle className="text-red-600 dark:text-red-400 text-xl" />
          </div>
          
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white text-center mb-2">
            {title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
            {message}
          </p>
          
          <div className="flex justify-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}