// components/PasteHeader.jsx
import { Edit2, Trash2, Save, X } from "lucide-react";
import Button from "../common/Button";

export default function PasteHeader({
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 sm:gap-0">
      <h2 className="text-2xl font-bold text-white">{isEditing ? "Edit Paste" : "View Paste"}</h2>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
        {!isEditing ? (
          <Button
            onClick={onEdit}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto flex justify-center gap-1"
          >
            <Edit2 className="w-4 h-4" />
            <span>Edit</span>
          </Button>
        ) : (
          <>
            <Button
              onClick={onSave}
              className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto flex justify-center gap-1"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </Button>
            <Button
              onClick={onCancel}
              className="bg-slate-700 hover:bg-slate-600 text-white w-full sm:w-auto flex justify-center gap-1"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </Button>
          </>
        )}

        <Button
          onClick={onDelete}
          className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto flex justify-center gap-1"
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete</span>
        </Button>
      </div>
    </div>
  );
}
