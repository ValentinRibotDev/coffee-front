import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    const isLoggedIn = () => !!token;

    // Au montage, essayer de récupérer un token via refresh cookie
    useEffect(() => {
        const fetchToken = async () => {
            try {
                const res = await fetch("http://localhost:8080/api/token/refresh", {
                    method: "POST",
                    credentials: "include", // envoie le cookie refresh token
                });
                if (res.ok) {
                    const data = await res.json();
                    setToken(data.token); // stocke le JWT pour fetchs futurs
                }
            } catch (err) {
                console.error("Impossible de récupérer le token:", err);
            }
        };
        fetchToken();
    }, []);

    return (
        <AuthContext.Provider value={{ token, setToken, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);