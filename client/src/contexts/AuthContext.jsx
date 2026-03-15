import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, restore user from localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        axios.defaults.headers.common['x-auth-token'] = token;
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await axios.post('/api/auth/login', { email, password });
    const { token, user: userData } = res.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    axios.defaults.headers.common['x-auth-token'] = token;
    setUser(userData);
    return userData;
  };

  const register = async (firstName, lastName, email, password) => {
    const res = await axios.post('/api/auth/register', {
      firstName,
      lastName,
      email,
      password,
    });
    const { token, user: userData } = res.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    axios.defaults.headers.common['x-auth-token'] = token;
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['x-auth-token'];
    setUser(null);
  };

  // Returns just the first name for greetings like "Welcome, Abby"
  const getFirstName = () => {
    if (!user?.name) return '';
    return user.name.split(' ')[0];
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, getFirstName }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
