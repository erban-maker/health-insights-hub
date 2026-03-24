import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
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
    return stored ? (JSON.parse(stored) as User) : null;
  });

  const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch(`${apiBase}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) return false;

      const data = (await response.json()) as { user: User; token: string };
      setUser(data.user);
      localStorage.setItem('health_user', JSON.stringify(data.user));
      localStorage.setItem('health_token', data.token);
      localStorage.removeItem('health_users');
      return true;
    } catch {
      return false;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${apiBase}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) return false;

      const data = (await response.json()) as { user: User; token: string };
      setUser(data.user);
      localStorage.setItem('health_user', JSON.stringify(data.user));
      localStorage.setItem('health_token', data.token);
      localStorage.removeItem('health_users');
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('health_user');
    localStorage.removeItem('health_token');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
