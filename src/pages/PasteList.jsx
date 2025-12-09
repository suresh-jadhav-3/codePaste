import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import PasteCard from "../components/common/PasteCard";
import Loader from "../components/Loader";
import useFetchPastes from "../hooks/useFetchPastes";
import { LANGUAGES } from "../utils/Languages";

export default function PasteList() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    data: pasteList,
    loading,
    error,
    fetchPastes,
  } = useFetchPastes(user?.$id);

  useEffect(() => {
    fetchPastes();
  }, [user?.$id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-slate-400">Manage all your saved code snippets</p>
        </div>

        {/* Content Card */}
        <div className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 p-6">
          <h2 className="text-xl font-bold text-white mb-6">
            All Pastes ({pasteList.length})
          </h2>

          {/* Loading */}
          {loading && (
            <div className="flex justify-center py-10">
              <Loader />
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="text-red-400 mb-4">
              Error fetching pastes: {error.message}
            </div>
          )}

          {/* Paste List */}
          {!loading && !error && pasteList.length > 0 && (
            <div className="space-y-3 max-h-[calc(100vh-250px)] grid grid-cols-2 gap-x-3 overflow-y-auto pr-2">
              <PasteCard
                pasteList={pasteList}
                LANGUAGES={LANGUAGES}
                onView={(id) => navigate(`/pastedCode/${id}`)}
                onEdit={(id) => navigate(`/pastedCode/${id}?edit=true`)}
                onDelete={(id) => console.log("Delete paste", id)}
              />
            </div>
          )}

          {/* Empty State */}
          {!loading && pasteList.length === 0 && (
            <p className="text-slate-400 text-center py-10">
              You have no saved pastes yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
