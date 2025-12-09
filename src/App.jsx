import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PasteList from "./pages/PasteList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PasteView from "./pages/PasteViewer";
import Loader from "./components/Loader";
import UserProfile from "./pages/UserProfile";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div><Loader /> </div>;

  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <div className="bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
        <Navbar />
        <ToastContainer position="top-right" autoClose={2000} />
        <Routes>
          <Route
            path="/"
            element={
                <Home />
            }
          />

          <Route
            path="/pastes"
            element={
              <ProtectedRoute>
                <PasteList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/pastedCode/:id"
            element={
              <ProtectedRoute>
                <PasteView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />

          {/* public pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* fallback route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
