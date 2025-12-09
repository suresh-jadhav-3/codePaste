import React from "react";
import { Eye, Edit2, Trash2, Calendar } from "lucide-react";
import { FormatDate } from "../../utils/DateFormater";

const PasteCard = ({
  pasteList = [],
  LANGUAGES = [],
  onView = () => {},
  onEdit = () => {},
  onDelete = () => {},
}) => {
  if (pasteList.length === 0) {
    return (
      <div className="text-center py-8 text-slate-400">
        No pastes yet. Create one from the home page!
      </div>
    );
  }

  return (
    // <div className="space-y-3 max-h-[calc(100vh-250px)] grid grid-cols-1  md:grid-cols-2 overflow-y-auto pr-2">
    <>
      {pasteList.map((paste) => (
        <div
          key={paste.$id}
          className="bg-slate-900 border border-slate-700 rounded-lg p-4 transition cursor-pointer hover:border-slate-600"
        >
          {/* Title + Actions */}
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-white font-medium truncate">{paste.title}</h3>

            <div className="flex gap-2">
              <button onClick={() => onView(paste.$id)}>
                <Eye className="text-white cursor-pointer" size={17} />
              </button>
              <button onClick={() => onEdit(paste.$id)}>
                <Edit2 className="text-white cursor-pointer" size={17} />
              </button>
              <button onClick={() => onDelete(paste.$id)}>
                <Trash2 className="text-red-600 cursor-pointer" size={17} />
              </button>
            </div>
          </div>

          {/* Language */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-blue-400 bg-blue-500/10 px-2 py-1 rounded">
              {LANGUAGES.find((l) => l.value === paste.language)?.label ||
                paste.language}
            </span>
            <span className="text-slate-500">
              {FormatDate(paste.$updatedAt)}
            </span>
          </div>
          <div className="mt-2 text-slate-400 text-xs font-mono line-clamp-2">
            {paste.code.substring(0, 50)}...
          </div>
        </div>
      ))}
    {/* </div> */}
    </>
  );
};

export default PasteCard;
