import { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { parseJwt } from './auth.service';

const BASE_URL = 'http://localhost:8080/auth/';

const AuthContext = createContext({
  user: null,
  login: async (username, password) => {
    throw new Error('AuthContext not yet initialized');
  },
  loading: true,
  hasRole: () => {
    throw new Error('AuthContext not yet initialized');
  },
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logoutTimer, setLogoutTimer] = useState(null);

  const clearLogoutTimeout = useCallback(() => {
    if (logoutTimer) {
      clearTimeout(logoutTimer);
      setLogoutTimer(null);
    }
  }, [logoutTimer]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    clearLogoutTimeout();
  }, [clearLogoutTimeout]);

  const setLogoutTimeout = useCallback((accessToken) => {
    clearLogoutTimeout();

    if (accessToken) {
      const { exp } = parseJwt(accessToken);
      const currentTime = Math.floor(Date.now() / 1000);
      const timeout = (exp - currentTime) * 1000;

      const timer = setTimeout(() => {
        logout();
      }, timeout);

      setLogoutTimer(timer);
    }
  }, [clearLogoutTimeout, logout]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const parsedUser = JSON.parse(loggedInUser);
      setUser(parsedUser);
      setLoading(false);
      setLogoutTimeout(parsedUser.accessToken);
    }
  }, []);

  const login = useCallback(async (username, password) => {
    try {
      const response = await axios.post(BASE_URL + 'login', { username, password });
      const { accessToken } = response.data;
      const data = parseJwt(accessToken);
      const loggedInUser = { data, accessToken };
      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      setLoading(false);
      setLogoutTimeout(accessToken);
      return response;
    } catch (err) {
      throw err;
    }
  }, [setLogoutTimeout]);


  const hasRole = useCallback((requiredRole) => {
    const userRole = user?.data.rol;
  
    // Check if userRole is an array and includes the requiredRole
    return Array.isArray(userRole) && userRole.includes(requiredRole);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, loading, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
