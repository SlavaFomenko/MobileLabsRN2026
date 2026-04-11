
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  function login(email, password) {
    if (email && password) {
      setUser({ email, name: email.split('@')[0] });
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }

  function register(email, password, name) {
    if (email && password && name) {
      setUser({ email, name });
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }

  function logout() {
    setUser(null);
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
