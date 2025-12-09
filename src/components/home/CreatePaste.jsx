// import React, { useState } from "react";
// import service from "../../appwrite/config";
// import { Save, Clock, Code2, ChevronRight } from "lucide-react";
// import { toast } from "react-toastify";
// import { LANGUAGES } from "../../utils/Languages";
// import Card from "../common/Card";
// import Input from "../common/Input";
// import Label from "../common/Label";
// import Select from "../common/Select";
// import CodeEditor from "../CodeEditor";
// import Button from "../common/Button";
// import { useAuth } from "../../contexts/AuthContext";

// function CreatePaste({fetchData}) {
//   const { user } = useAuth();

//   const [title, setTitle] = useState("");
//   const [code, setCode] = useState("// Start typing your code here...");
//   const [language, setLanguage] = useState("javascript");
//   const [saving, setSaving] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleSave = async () => {
//     if (!title.trim()) {
//       setMessage("Please enter a title");
//       return;
//     }

//     if (!code.trim()) {
//       setMessage("Please enter some code");
//       return;
//     }

//     setSaving(true);
//     setMessage("");

//     try {
//       const result = await service.createCodePatses({
//         userId: user?.$id,
//         title: title.trim(),
//         code: code,
//         language: language,
//       });

//       if (result) fetchData();

//       setMessage("Code saved successfully!");
//       setTitle("");
//       setCode("// Start typing your code here...");
//       setLanguage("javascript");
//     } catch (error) {
//       setMessage("Error saving code");
//       console.log(error, "error from home page");
//     } finally {
//       setSaving(false);
//     }
//   };
//   return (
//     <div className="lg:col-span-2 space-y-6">
//       <Card>
//         <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
//           <Code2 className="w-6 h-6 mr-2 text-blue-400" />
//           Create New Paste
//         </h2>

//         {message && (
//           <div
//             className={`mb-4 px-4 py-3 rounded-lg text-sm ${
//               message.includes("Error")
//                 ? "bg-red-500/10 border border-red-500/50 text-red-400"
//                 : "bg-green-500/10 border border-green-500/50 text-green-400"
//             }`}
//           >
//             {message}
//           </div>
//         )}

//         <div className="space-y-4">
//           <div className="flex flex-col sm:flex-row gap-5">
//             {/* Title Input */}
//             <div className="w-full sm:w-1/2">
//               <Label >Title</Label>
//               <Input
//                 value={title}
//                 onChange={setTitle}
//                 placeholder="Enter a title for your code..."
//                 className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//               />
//             </div>

//             {/* Language Selector */}
//             <div className="w-full sm:w-1/2">
//               <Label >Language</Label>
//               <Select
//                 value={language}
//                 onChange={setLanguage}
//                 options={LANGUAGES}
//                 className="w-full"
//               />
//             </div>
//           </div>

//           <div>
//             <Label >Code</Label>
//             <div className="border border-slate-700 rounded-lg overflow-hidden">
//               <CodeEditor
//                 height={"400px"}
//                 value={code}
//                 onChange={setCode}
//                 language={language}
//               />
//             </div>
//           </div>

//           {/* Save Button */}
//           <Button
//             onClick={handleSave}
//             disabled={saving}
//             className="w-full py-3 font-semibold rounded-lg bg-blue-600  hover:bg-blue-700"
//           >
//             <Save className="w-5 h-5" />
//             <span>{saving ? "Saving..." : "Save Paste"}</span>
//           </Button>
//         </div>
//       </Card>
//     </div>
//   );
// }

// export default CreatePaste;


// import React, { useState } from "react";
// import service from "../../appwrite/config";
// import { Save, Clock, Code2, ChevronRight } from "lucide-react";
// import { toast } from "react-toastify";
// import { LANGUAGES } from "../../utils/Languages";
// import Card from "../common/Card";
// import Input from "../common/Input";
// import Label from "../common/Label";
// import Select from "../common/Select";
// import CodeEditor from "../CodeEditor";
// import Button from "../common/Button";
// import { useAuth } from "../../contexts/AuthContext";

// function CreatePaste({fetchData}) {
//   const { user } = useAuth();

//   const [title, setTitle] = useState("");
//   const [code, setCode] = useState("// Start typing your code here...");
//   const [language, setLanguage] = useState("javascript");
//   const [saving, setSaving] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleSave = async () => {
//     if (!title.trim()) {
//       setMessage("Please enter a title");
//       return;
//     }

//     if (!code.trim()) {
//       setMessage("Please enter some code");
//       return;
//     }

//     setSaving(true);
//     setMessage("");

//     try {
//       const result = await service.createCodePatses({
//         userId: user?.$id,
//         title: title.trim(),
//         code: code,
//         language: language,
//       });

//       if (result) fetchData();

//       setMessage("Code saved successfully!");
//       setTitle("");
//       setCode("// Start typing your code here...");
//       setLanguage("javascript");
//     } catch (error) {
//       setMessage("Error saving code");
//       console.log(error, "error from home page");
//     } finally {
//       setSaving(false);
//     }
//   };
//   return (
//     <div className="lg:col-span-2 space-y-6">
//       <Card>
//         <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
//           <Code2 className="w-6 h-6 mr-2 text-blue-400" />
//           Create New Paste
//         </h2>

//         {message && (
//           <div
//             className={`mb-4 px-4 py-3 rounded-lg text-sm ${
//               message.includes("Error")
//                 ? "bg-red-500/10 border border-red-500/50 text-red-400"
//                 : "bg-green-500/10 border border-green-500/50 text-green-400"
//             }`}
//           >
//             {message}
//           </div>
//         )}

//         <div className="space-y-4">
//           <div className="flex flex-col sm:flex-row gap-5">
//             {/* Title Input */}
//             <div className="w-full sm:w-1/2">
//               <Label >Title</Label>
//               <Input
//                 value={title}
//                 onChange={setTitle}
//                 placeholder="Enter a title for your code..."
//                 className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//               />
//             </div>

//             {/* Language Selector */}
//             <div className="w-full sm:w-1/2">
//               <Label >Language</Label>
//               <Select
//                 value={language}
//                 onChange={setLanguage}
//                 options={LANGUAGES}
//                 className="w-full"
//               />
//             </div>
//           </div>

//           <div>
//             <Label >Code</Label>
//             <div className="border border-slate-700 rounded-lg overflow-hidden">
//               <CodeEditor
//                 height={"400px"}
//                 value={code}
//                 onChange={setCode}
//                 language={language}
//               />
//             </div>
//           </div>

//           {/* Save Button */}
//           <Button
//             onClick={handleSave}
//             disabled={saving}
//             className="w-full py-3 font-semibold rounded-lg bg-blue-600  hover:bg-blue-700"
//           >
//             <Save className="w-5 h-5" />
//             <span>{saving ? "Saving..." : "Save Paste"}</span>
//           </Button>
//         </div>
//       </Card>
//     </div>
//   );
// }

// export default CreatePaste;



import React, { useState } from "react";
import service from "../../appwrite/config";
import { Save, Code2 } from "lucide-react";
import { toast } from "react-toastify";
import { LANGUAGES } from "../../utils/Languages";
import Card from "../common/Card";
import Input from "../common/Input";
import Label from "../common/Label";
import Select from "../common/Select";
import CodeEditor from "../CodeEditor";
import Button from "../common/Button";
import { useAuth } from "../../contexts/AuthContext";

function CreatePaste({ fetchData }) {
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [code, setCode] = useState("// Start typing your code here...");
  const [language, setLanguage] = useState("javascript");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    // If user is not logged in
    if (!user) {
      toast.error("Please login to create a paste");
      return;
    }

    if (!title.trim()) {
      setMessage("Please enter a title");
      return;
    }

    if (!code.trim()) {
      setMessage("Please enter some code");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const result = await service.createCodePastes({
        userId: user.$id,
        title: title.trim(),
        code: code,
        language: language,
      });

      if (result) fetchData();

      setMessage("Code saved successfully!");
      setTitle("");
      setCode("// Start typing your code here...");
      setLanguage("javascript");
    } catch (error) {
      setMessage("Error saving code");
      console.log(error, "error from home page");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="lg:col-span-2 space-y-6">
      <Card>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Code2 className="w-6 h-6 mr-2 text-blue-400" />
          Create New Paste
        </h2>

        {message && (
          <div
            className={`mb-4 px-4 py-3 rounded-lg text-sm ${
              message.includes("Error")
                ? "bg-red-500/10 border border-red-500/50 text-red-400"
                : "bg-green-500/10 border border-green-500/50 text-green-400"
            }`}
          >
            {message}
          </div>
        )}

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-5">
            {/* Title Input */}
            <div className="w-full sm:w-1/2">
              <Label>Title</Label>
              <Input
                value={title}
                onChange={setTitle}
                placeholder="Enter a title for your code..."
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* Language Selector */}
            <div className="w-full sm:w-1/2">
              <Label>Language</Label>
              <Select
                value={language}
                onChange={setLanguage}
                options={LANGUAGES}
                className="w-full"
              />
            </div>
          </div>

          <div>
            <Label>Code</Label>
            <div className="border border-slate-700 rounded-lg overflow-hidden">
              <CodeEditor height={"400px"} value={code} onChange={setCode} language={language} />
            </div>
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-3 font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            {saving ? "Saving..." : "Save Paste"}
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default CreatePaste;
