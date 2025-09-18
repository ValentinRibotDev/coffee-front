import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // Fonction pour vérifier si l'utilisateur est connecté
  const isLoggedIn = () => !!token;

  return (
    <AuthContext.Provider value={{ token, setToken, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);