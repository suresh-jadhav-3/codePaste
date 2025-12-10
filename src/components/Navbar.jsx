import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Code2, LogOut, List, Home, User } from "lucide-react";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "./common/Button";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
      setOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Failed to log out, try again.");
    }
  };

  // Avatar letter
  const avatar = user?.name?.charAt(0)?.toUpperCase();

  return (
    <nav className="bg-slate-900 border-b border-slate-800 shadow-lg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo click → Home */}
          <Button
            onClick={() => navigate("/")}
            className="text-white hover:text-blue-400 "
          >
            <Code2 className="w-8 h-8" />
            <span className="text-xl font-bold">CodePaste</span>
          </Button>

          {/* Menu */}
          {user ? (
            <div className="flex items-center space-x-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-slate-800 text-white"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`
                }
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </NavLink>

              <NavLink
                to="/pastes"
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-slate-800 text-white"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`
                }
              >
                <List className="w-4 h-4" />
                <span>My Pastes</span>
              </NavLink>

              {/* Avatar Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold hover:bg-blue-500 transition"
                >
                  {avatar}
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg border border-slate-700 shadow-lg animate-fadeIn">
                    <button
                      onClick={() => {
                        setOpen(false);
                        navigate("/profile");
                      }}
                      className="w-full flex items-center px-4 py-3 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </button>

                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center px-4 py-3 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Show Login / Sign Up buttons for guests
            <div className="flex space-x-4">
              <Button
                onClick={() => navigate("/login")}
                className="text-white bg-blue-600 hover:bg-blue-700 "
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/register")}
                className="text-white bg-blue-600 hover:bg-blue-700 "
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
