import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";

import Loader from "../components/Loader";
import service from "../appwrite/config";

import Label from "../components/common/Label";
import PasteHeader from "../components/pasteViewer/PasteHeader";
import PasteFields from "../components/pasteViewer/PasteFields";
import CodeEditor from "../components/CodeEditor";
import Card from "../components/common/Card";
import BackButton from "../components/pasteViewer/BackButton ";

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
  const handleDelete = async () => {
    if (!window.confirm("Delete this paste?")) return;

    await service.deleteCodePastes(paste.$id);
    navigate("/pastes");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-900 p-8 flex justify-center">
      <div className=" rounded-xl w-full ">
        <BackButton to="/pastes" label="Back to list" />

        <Card>
          {/* Message */}
          {message && <div className="text-green-400 mb-4">{message}</div>}

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

          <div>
            <Label>Code</Label>
            <div className="border border-slate-700 rounded-lg overflow-hidden">
              <CodeEditor
                height={"500px"}
                value={isEditing ? code : paste.code}
                onChange={setCode}
                language={isEditing ? language : paste.language}
                readOnly={!isEditing}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
