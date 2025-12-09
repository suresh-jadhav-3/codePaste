// import React, { createContext, useContext, useState, useEffect } from "react";
// import authService from "../appwrite/auth";
// // import authService from "./path-to-your-authService"; // import your AuthService instance

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // On mount, check if user is logged in
//   useEffect(() => {
//     async function fetchUser() {
//       try {
//         const currentUser = await authService.getCurrentUser();
//         setUser(currentUser);
//       } catch {
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchUser();
//   }, []);

//   // Login method
//   async function login(email, password) {
//     try {
//       await authService.login({ email, password });
//       const currentUser = await authService.getCurrentUser();
//       setUser(currentUser);
//       return true;
//     } catch (error) {
//       throw error;
//     }
//   }

//   // Register method
//   async function register(email, password, name) {
//     try {
//       await authService.createAccount({ email, password, name });
//       const currentUser = await authService.getCurrentUser();
//       setUser(currentUser);
//       return true;
//     } catch (error) {
//       throw error;
//     }
//   }

//   // Logout method
//   async function logout() {
//     await authService.logout();
//     setUser(null);
//   }

//   async function

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,
//         login,
//         register,
//         logout,
//         isAuthenticated: !!user,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// // Custom hook for easier usage in components
// export function useAuth() {
//   return useContext(AuthContext);
// }


import React, { createContext, useContext, useState, useEffect } from "react";
import authService from "../appwrite/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount load current user
  useEffect(() => {
    async function fetchUser() {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  async function login(email, password) {
    await authService.login({ email, password });
    const currentUser = await authService.getCurrentUser();
    setUser(currentUser);
  }

  async function register(email, password, name) {
    await authService.createAccount({ email, password, name });
    const currentUser = await authService.getCurrentUser();
    setUser(currentUser);
  }

  async function logout() {
    await authService.logout();
    setUser(null);
  }

  // 🔥 Refresh user after updates
  async function refreshUser() {
    const updated = await authService.getCurrentUser();
    setUser(updated);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        refreshUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
