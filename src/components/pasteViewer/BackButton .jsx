import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BackButton({
  to = "/pastes",
  label = "Back to list",
  className = ""
}) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className={`flex items-center gap-2 text-slate-300 hover:text-white 
                 mb-4 px-3 py-2 rounded-lg transition 
                 hover:bg-slate-800/60 ${className}`}
    >
      <ArrowLeft className="w-4 h-4" />
      {label}
    </button>
  );
}
