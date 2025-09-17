import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // Exemple de fonction pour refresh automatiquement
  const refreshToken = async () => {
    const res = await fetch("http://localhost:8000/api/refresh", {
      method: "POST",
      credentials: "include", // obligatoire pour envoyer le cookie
    });

    if (res.ok) {
      const data = await res.json();
      setToken(data.accessToken);
    } else {
      setToken(null);
    }
  };

  // Refresh le token quand le provider se monte
  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);