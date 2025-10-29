import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase-config";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");    
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError("");

        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            alert(`Bem-vindo, ${user.displayName}!`);
            return navigate("/");
        } catch (err) {
            console.log("erro: ",err)
            setError("Erro ao fazer login com Google.");
        } finally {
        setLoading(false);
        }
    };

    return (
        <div>
        <div>
            <h1>Entrar com Google</h1>
            {error && <p>{error}</p>}
            <button onClick={handleGoogleLogin} disabled={loading}>
            {
                loading ? "Entrando..." : (
                    <>
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google"/>
                        Entrar com Google
                    </>
                )
            }
            </button>
        </div>
        </div>
    );
}

export default Login;