import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../firebase-config";
import { useNavigate } from "react-router-dom";

import { saveUser } from '../useCases/userCRUD';

const AuthContext = createContext({ user: null, loading: true });

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({ user: null, loading: true });
  const navigate = useNavigate();

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

  const register = async (userData) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await saveUser(user.email, {
        ...userData,
        email: user.email,
      }).then(() => {
        console.log("Usuário salvo/atualizado com sucesso!");
      }).catch((error) => {
        console.error("Erro ao salvar/atualizar usuário: ", error);
      })
      return navigate("/");
    } catch (err) {
      console.log("erro: ",err)
    }
  };

  const login = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      return navigate("/");
    } catch (err) {
      console.log("erro: ",err)
    }
  };

  return (
    <AuthContext.Provider value={{ login, register, authData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);