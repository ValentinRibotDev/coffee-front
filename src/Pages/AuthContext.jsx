import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    const isLoggedIn = () => !!token;

    // Fonction de déconnexion qui supprime le refresh token
    const logout = async () => {
        try {
            // Appel à l'endpoint backend pour révoquer le refresh token
            await fetch("http://localhost:8080/api/logout", {
                method: "POST",
                credentials: "include", // envoie le cookie refresh token
                headers: {
                    "Authorization": token ? `Bearer ${token}` : "",
                },
            });
        } catch (err) {
            console.error("Erreur lors de la déconnexion:", err);
        } finally {
            // Dans tous les cas, on efface le token local
            setToken(null);
        }
    };

    return (
        <AuthContext.Provider value={{ token, setToken, isLoggedIn, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);