import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase-config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({ user: null, loading: true });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthData({ user, loading: false });
    });
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    setAuthData({ user: null, loading: false });
  };

  return (
    <AuthContext.Provider value={{ authData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);