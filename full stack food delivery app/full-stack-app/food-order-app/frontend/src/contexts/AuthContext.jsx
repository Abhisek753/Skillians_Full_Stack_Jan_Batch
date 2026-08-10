import { createContext, useEffect, useState } from 'react';

// Context lets many components share login data without passing props.
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  // When the page refreshes, load saved login data from localStorage.
  useEffect(() => {
    const savedUser = localStorage.getItem('foodiehubUser');
    const savedToken = localStorage.getItem('foodiehubToken');

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  }, []);

  // Save login data in state and localStorage.
  const saveAuth = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('foodiehubUser', JSON.stringify(userData));
    localStorage.setItem('foodiehubToken', authToken);
  };

  // Clear login data when the user clicks logout.
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('foodiehubUser');
    localStorage.removeItem('foodiehubToken');
  };

  return (
    <AuthContext.Provider value={{ user, token, saveAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
