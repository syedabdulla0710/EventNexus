import React, { createContext, useState, useContext, useEffect } from 'react';

interface AuthUser {
  username: string;
  authdata: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem('eventnexus-user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = (userData: AuthUser) => {
    setUser(userData);
    localStorage.setItem('eventnexus-user', JSON.stringify(userData));
    localStorage.setItem('user', JSON.stringify(userData)); // keep legacy key for api.ts
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('eventnexus-user');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
