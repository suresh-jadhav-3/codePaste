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
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-white">
        {isEditing ? "Edit Paste" : "View Paste"}
      </h2>

      <div className="flex items-center space-x-2">
        {!isEditing ? (
          <>
            <Button
              onClick={onEdit}
              className=" bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Edit2 className="w-4 h-4" />
              <span>Edit</span>
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={onSave}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </Button>
            <Button
              onClick={onCancel}
              className="bg-slate-700 hover:bg-slate-600 text-white"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </Button>
          </>
        )}
        <Button
          onClick={onDelete}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete</span>
        </Button>
      </div>
    </div>
  );
}
