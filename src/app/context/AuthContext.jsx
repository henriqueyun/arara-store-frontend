import React, { createContext } from 'react';

import useAuth from './hooks/useAuth';

const Context = createContext();

function AuthProvider({ children }) {
  const {
    logged, loading, handleLogin, handleLogout
  } = useAuth();

  return (
    <Context.Provider value={{ loading, logged, handleLogin, handleLogout }}>
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };