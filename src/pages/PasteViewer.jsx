import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";

import Loader from "../components/Loader";
import service from "../appwrite/config";
import { toast } from "react-toastify";
import Label from "../components/common/Label";
import PasteHeader from "../components/pasteViewer/PasteHeader";
import PasteFields from "../components/pasteViewer/PasteFields";
import CodeEditor from "../components/CodeEditor";
import Card from "../components/common/Card";
import BackButton from "../components/pasteViewer/BackButton ";
import DeleteConfirmModal from "../components/DeleteConfirmModal ";

export default function PasteView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [paste, setPaste] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [isEditing, setIsEditing] = useState(
    searchParams.get("edit") === "true"
  );

  // Editable fields
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  // Fetch paste
  useEffect(() => {
    async function fetchPaste() {
      setLoading(true);

      const res = await service.getCodePastesById(id);

      if (res) {
        setPaste(res);
        setTitle(res.title);
        setCode(res.code);
        setLanguage(res.language);
      }

      setLoading(false);
    }
    fetchPaste();
  }, [id]);

  // Save
  const handleSave = async () => {
    await service.updateCodePastes(paste.$id, { title, code, language });

    setPaste({ ...paste, title, code, language });
    setIsEditing(false);

    setMessage("Updated!");
    setTimeout(() => setMessage(""), 2000);
  };

  // Delete
  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      await service.deleteCodePastes(deleteId);
      toast.success("Paste deleted successfully!");
      navigate("/pastes");
    } catch (error) {
      toast.error("Failed to delete paste");
    }

    setDeleteId(null);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-900">
        <Loader />
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-900 py-6 px-4 sm:px-6 lg:px-20 flex justify-center">
      <div className="w-full  flex flex-col gap-6">
        {/* Back button */}
        <BackButton to="/pastes" label="Back to list" />

        <Card className="p-4 sm:p-6 lg:p-8">
          {/* Message */}
          {message && (
            <div className="text-green-400 mb-4 text-sm sm:text-base">
              {message}
            </div>
          )}

          {/* Header */}
          <PasteHeader
            isEditing={isEditing}
            onEdit={() => setIsEditing(true)}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
            onDelete={handleDelete}
          />

          {/* Fields */}
          <PasteFields
            isEditing={isEditing}
            title={title}
            setTitle={setTitle}
            language={language}
            setLanguage={setLanguage}
          />

          {/* Code editor */}
          <div className="mt-4">
            <Label>Code</Label>
            <div className="border border-slate-700 rounded-lg overflow-hidden">
              <CodeEditor
                height="400px"
                value={isEditing ? code : paste.code}
                onChange={setCode}
                language={isEditing ? language : paste.language}
                readOnly={!isEditing}
                className="w-full"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
