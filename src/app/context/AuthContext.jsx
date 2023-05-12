import React, { createContext, useMemo } from 'react';

import useAuth from './hooks/useAuth';

const Context = createContext();

function AuthProvider({ children }) {
  const {
    logged, loading, handleLogin, handleLogout,
  } = useAuth();
  const providerValue = useMemo(() => ({
    loading, logged, handleLogin, handleLogout,
  }), []);

  return (
    <Context.Provider value={providerValue}>
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };
