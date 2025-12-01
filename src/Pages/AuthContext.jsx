import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Initialisation : vérifier si on a un refresh token valide au démarrage
    useEffect(() => {
        const initAuth = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/token/refresh", {
                    method: "POST",
                    credentials: "include",
                });

                if (response.ok) {
                    const data = await response.json();
                    setToken(data.token);
                }
            } catch (err) {
                console.error("Erreur lors de l'initialisation de l'auth:", err);
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    const isLoggedIn = () => !!token;

    // Fonction de connexion via /api/login_check (endpoint Lexik)
    const login = async (email, password) => {
        try {
            const response = await fetch("http://localhost:8080/api/login_check", {
                method: "POST",
                credentials: "include", // Important pour recevoir le cookie refresh_token
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                // Le token JWT est dans data.token grâce à votre listener
                setToken(data.token);
                return { success: true };
            } else {
                const errorData = await response.json().catch(() => ({}));
                return {
                    success: false,
                    error: errorData.message || "Identifiants incorrects"
                };
            }
        } catch (err) {
            console.error("Erreur lors de la connexion:", err);
            return { success: false, error: "Erreur de connexion" };
        }
    };

    // Fonction de rafraîchissement du token
    const refreshToken = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/token/refresh", {
                method: "POST",
                credentials: "include", // Envoie le cookie refresh_token
            });

            if (response.ok) {
                const data = await response.json();
                setToken(data.token);
                return data.token;
            } else {
                // Si le refresh échoue, déconnecter l'utilisateur
                setToken(null);
                return null;
            }
        } catch (err) {
            console.error("Erreur lors du refresh:", err);
            setToken(null);
            return null;
        }
    };

    // Fonction de déconnexion
    const logout = async () => {
        try {
            await fetch("http://localhost:8080/api/logout", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Authorization": token ? `Bearer ${token}` : "",
                },
            });
        } catch (err) {
            console.error("Erreur lors de la déconnexion:", err);
        } finally {
            setToken(null);
        }
    };

    return (
        <AuthContext.Provider value={{
            token,
            setToken,
            isLoggedIn,
            login,
            logout,
            refreshToken,
            loading
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);