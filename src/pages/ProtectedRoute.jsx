import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

export function ProtectedRoute({ children }) {
    const { authData } = useAuth();
    if(authData.loading) return <p>Carregando...</p>;
    if (!authData.user) return <Navigate to="/login" />;
    return children;
};