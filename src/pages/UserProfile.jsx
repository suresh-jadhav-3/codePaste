// import { useState } from "react";
// import { Code2 } from "lucide-react";
// import { useAuth } from "../contexts/AuthContext";

// export default function UserProfile() {
//   const {  user } = useAuth();
//   console.log(user);

//   const [name, setName] = useState(user?.name);
//   const [email, setEmail] = useState(user?.email);
//   const [password, setPassword] = useState("");
//   const [saving, setSaving] = useState(false);

//   // Get First Letter for Avatar
//   const avatarLetter = name?.charAt(0)?.toUpperCase();

//   const handleSave = (e) => {
//     e.preventDefault();
//     setSaving(true);

//     setTimeout(() => {
//       setSaving(false);
//       alert("Profile Updated!");
//     }, 1200);
//   };

//   return (
//     <div className="min-h-screen  bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <div className="text-center mb-8">
//           {/* <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mb-4">
//             <Code2 className="w-8 h-8 text-white" />
//           </div>
//           <h1 className="text-3xl font-bold text-white mb-2">Your Profile</h1> */}
//           <p className="text-slate-400">Manage your account details</p>
//         </div>

//         <div className="bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-700">
//           {/* Avatar */}
//           <div className="flex justify-center mb-6">
//             <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-4xl font-bold text-white">
//               {avatarLetter}
//             </div>
//           </div>

//           <form className="space-y-6" onSubmit={handleSave}>
//             {/* Name */}
//             <div>
//               <label className="block text-sm text-slate-300 mb-2">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 className="w-full px-4 py-3 bg-slate-900 border border-slate-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Your name"
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <label className="block text-sm text-slate-300 mb-2">Email</label>
//               <input
//                 type="email"
//                 className="w-full px-4 py-3 bg-slate-900 border border-slate-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="you@example.com"
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block text-sm text-slate-300 mb-2">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 className="w-full px-4 py-3 bg-slate-900 border border-slate-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Update password"
//               />
//             </div>

//             {/* Save Button */}
//             <button
//               type="submit"
//               disabled={saving}
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
//             >
//               {saving ? "Saving..." : "Save Changes"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { Code2 } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import authService from "../appwrite/auth";

export default function Profile() {
  const { user, refreshUser } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  if (!user) return <div className="text-white p-6">Loading...</div>;

  const avatar = name.charAt(0).toUpperCase();

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (name !== user.name) {
        await authService.updateName(name);
      }

      if (email !== user.email) {
        await authService.updateEmail(email, currentPassword);
      }

      if (password.length > 0) {
        await authService.updatePassword(password, currentPassword);
      }

      await refreshUser();
      alert("Profile updated successfully!");
    } catch (err) {
      alert(err.message);
    }

    setSaving(false);
  };

  return (
    <div className=" h-[calc(100vh-65px)] flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-xl">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-blue-600 text-white text-4xl font-bold flex items-center justify-center rounded-full">
              {avatar}
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-3">
            {/* NAME */}
            <div>
              <label className="text-slate-300 text-sm">Full Name</label>
              <input
                className="w-full px-4 py-3 mt-2 bg-slate-900 border border-slate-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-slate-300 text-sm">Email</label>
              <input
                className="w-full px-4 py-3 mt-2 bg-slate-900 border border-slate-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </div>

            {/* NEW PASSWORD */}
            <div>
              <label className="text-slate-300 text-sm">New Password</label>
              <input
                className="w-full px-4 py-3 mt-2 bg-slate-900 border border-slate-700 text-white rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave empty if not changing"
                type="password"
              />
            </div>

            {/* CURRENT PASSWORD */}
            <div>
              <label className="text-slate-300 text-sm">Current Password</label>
              <input
                className="w-full px-4 py-3 mt-2 bg-slate-900 border border-slate-700 text-white rounded-lg"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Required for email/password update"
                type="password"
              />
            </div>

            <button
              disabled={saving}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
