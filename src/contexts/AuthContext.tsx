import React, { createContext, useContext, useState, ReactNode } from 'react';
import { API_BASE_URL } from '@/lib/api';

interface User {
  name: string;
  email: string;
}

interface AuthResult {
  success: boolean;
  message?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (name: string, email: string, password: string) => Promise<AuthResult>;
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

  const register = async (name: string, email: string, password: string): Promise<AuthResult> => {
    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: normalizedName, email: normalizedEmail, password }),
      });

      if (!response.ok) {
        const errorPayload = (await response.json().catch(() => null)) as { message?: string } | null;
        return {
          success: false,
          message: errorPayload?.message || 'Registration failed. Please try again.',
        };
      }

      const data = (await response.json()) as { user: User; token: string };
      setUser(data.user);
      localStorage.setItem('health_user', JSON.stringify(data.user));
      localStorage.setItem('health_token', data.token);
      localStorage.removeItem('health_users');
      return { success: true };
    } catch {
      return { success: false, message: 'Unable to reach server. Please check your connection.' };
    }
  };

  const login = async (email: string, password: string): Promise<AuthResult> => {
    const normalizedEmail = email.trim().toLowerCase();

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail, password }),
      });

      if (!response.ok) {
        const errorPayload = (await response.json().catch(() => null)) as { message?: string } | null;
        return {
          success: false,
          message: errorPayload?.message || 'Login failed. Please try again.',
        };
      }

      const data = (await response.json()) as { user: User; token: string };
      setUser(data.user);
      localStorage.setItem('health_user', JSON.stringify(data.user));
      localStorage.setItem('health_token', data.token);
      localStorage.removeItem('health_users');
      return { success: true };
    } catch {
      return { success: false, message: 'Unable to reach server. Please check your connection.' };
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
