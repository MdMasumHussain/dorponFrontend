"use client";
import { createContext, useContext, useState, useEffect } from 'react';
// import Cookies from 'js-cookie';
import { logoutUser } from '../lib/user';

const AuthContext = createContext();

export const AuthProvider = ({token, children }) => {
  const [user, setUser] = useState(token ? { loggedIn: true } : null);

  // useEffect(() => {
  //   const token = Cookies.get('token');
  //   if (token) {
  //     // In a real app, you'd verify the token and fetch user data
  //     setUser({ loggedIn: true });
  //   }
  // }, []);

  const login = (userData) => {
    // Cookies.set('token', userData.token, { expires: 7 });
    setUser({ loggedIn: true });
  };

  const logout = async () => {
    await logoutUser();
    // Cookies.remove('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
