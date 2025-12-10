import React from "react";

const DeleteConfirmModal = ({ open, onClose, onConfirm }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 w-full max-w-sm animate-scaleIn">
        <h2 className="text-white text-lg font-semibold">Delete Paste?</h2>
        <p className="text-slate-400 text-sm mt-2">
          Are you sure you want to delete this paste? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded bg-slate-700 hover:bg-slate-600 text-white"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm rounded bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
