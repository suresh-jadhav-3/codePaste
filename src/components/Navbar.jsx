import { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Code2, LogOut, List, Home, User, Menu, X } from "lucide-react";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "./common/Button";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false); 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); 

  const avatar = user?.name?.charAt(0)?.toUpperCase();

 
  const dropdownRef = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
      setOpen(false);
      setMobileMenuOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Failed to log out, try again.");
    }
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 shadow-lg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo click → Home */}
          <Button
            onClick={() => {
              navigate("/");
              setMobileMenuOpen(false);
            }}
            className="text-white hover:text-blue-400 flex items-center space-x-2"
          >
            <Code2 className="w-8 h-8" />
            <span className="text-xl font-bold">CodePaste</span>
          </Button>

          {/* Desktop Menu */}
          {user ? (
            <>
              <div className="hidden md:flex items-center space-x-4">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
                      isActive
                        ? "bg-slate-800 text-white"
                        : "text-slate-400 hover:text-white hover:bg-slate-800"
                    }`
                  }
                  onClick={() => setMobileMenuOpen(false)}
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
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <List className="w-4 h-4" />
                  <span>My Pastes</span>
                </NavLink>

                {/* Avatar Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setOpen(!open)}
                    className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold hover:bg-blue-500 transition"
                  >
                    {avatar}
                  </button>

                  {open && (
                    <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg border border-slate-700 shadow-lg animate-fadeIn z-50">
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

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-white focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </>
          ) : (
            // Guest Login/Signup buttons
            <div className="hidden md:flex space-x-4">
              <Button
                onClick={() => navigate("/login")}
                className="text-white bg-blue-600 hover:bg-blue-700"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/register")}
                className="text-white bg-blue-600 hover:bg-blue-700"
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileMenuOpen && user && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 shadow-md">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 transition ${
                isActive ? "bg-slate-800 text-white" : ""
              }`
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="flex items-center space-x-2">
              <Home className="w-5 h-5" />
              <span>Home</span>
            </div>
          </NavLink>

          <NavLink
            to="/pastes"
            className={({ isActive }) =>
              `block px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 transition ${
                isActive ? "bg-slate-800 text-white" : ""
              }`
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="flex items-center space-x-2">
              <List className="w-5 h-5" />
              <span>My Pastes</span>
            </div>
          </NavLink>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              navigate("/profile");
            }}
            className="w-full flex items-center px-4 py-3 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition border-t border-slate-700"
          >
            <User className="w-5 h-5 mr-2" />
            Profile
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              handleSignOut();
            }}
            className="w-full flex items-center px-4 py-3 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition border-t border-slate-700"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>
      )}

      {/* Mobile guest login/signup */}
      {mobileMenuOpen && !user && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 shadow-md flex flex-col space-y-2 p-4">
          <Button
            onClick={() => {
              navigate("/login");
              setMobileMenuOpen(false);
            }}
            className="w-full text-white bg-blue-600 hover:bg-blue-700"
          >
            Login
          </Button>
          <Button
            onClick={() => {
              navigate("/register");
              setMobileMenuOpen(false);
            }}
            className="w-full text-white bg-blue-600 hover:bg-blue-700"
          >
            Sign Up
          </Button>
        </div>
      )}
    </nav>
  );
}
