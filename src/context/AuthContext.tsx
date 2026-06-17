import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, remember?: boolean) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAIL = 'admin@sunscreen.com';
const ADMIN_PASSWORD = 'admin123';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('sunscreen_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, remember = false): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const isAdmin = email === ADMIN_EMAIL && password === ADMIN_PASSWORD;

    if (isAdmin) {
      const adminUser: User = {
        id: 'admin-001',
        name: 'Admin',
        email: ADMIN_EMAIL,
        role: 'admin',
        createdAt: new Date().toISOString(),
      };
      setUser(adminUser);
      if (remember) {
        localStorage.setItem('sunscreen_user', JSON.stringify(adminUser));
      } else {
        sessionStorage.setItem('sunscreen_user', JSON.stringify(adminUser));
      }
      return true;
    }

    const users = JSON.parse(localStorage.getItem('sunscreen_users') || '[]');
    const existingUser = users.find((u: User & { password: string }) => u.email === email && u.password === password);

    if (existingUser) {
      const { password: _, ...userWithoutPassword } = existingUser;
      setUser(userWithoutPassword);
      if (remember) {
        localStorage.setItem('sunscreen_user', JSON.stringify(userWithoutPassword));
      } else {
        sessionStorage.setItem('sunscreen_user', JSON.stringify(userWithoutPassword));
      }
      return true;
    }

    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const users = JSON.parse(localStorage.getItem('sunscreen_users') || '[]');

    if (users.some((u: User) => u.email === email)) {
      return false;
    }

    const newUser: User & { password: string } = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
      role: 'user',
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem('sunscreen_users', JSON.stringify(users));

    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('sunscreen_user', JSON.stringify(userWithoutPassword));

    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sunscreen_user');
    sessionStorage.removeItem('sunscreen_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
