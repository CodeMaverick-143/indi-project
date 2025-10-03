import { createContext, useState, useEffect, useContext } from "react";
import { API_BASE_URL } from "../config/api";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
            verifyToken();
    } else {
      localStorage.removeItem("token");
      setUser(null);
    }
  }, [token]);

  const verifyToken = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setToken(null);
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      setToken(null);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
