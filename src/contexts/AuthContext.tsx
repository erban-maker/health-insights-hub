import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('health_user');
    return stored ? JSON.parse(stored) : null;
  });

  const register = (name: string, email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('health_users') || '[]');
    if (users.find((u: any) => u.email === email)) return false;
    users.push({ name, email, password });
    localStorage.setItem('health_users', JSON.stringify(users));
    const u = { name, email };
    setUser(u);
    localStorage.setItem('health_user', JSON.stringify(u));
    return true;
  };

  const login = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('health_users') || '[]');
    const found = users.find((u: any) => u.email === email && u.password === password);
    if (!found) return false;
    const u = { name: found.name, email: found.email };
    setUser(u);
    localStorage.setItem('health_user', JSON.stringify(u));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('health_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
