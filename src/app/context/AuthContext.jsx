import React, { createContext, useMemo } from 'react';

import useAuth from './hooks/useAuth';

const Context = createContext();

function AuthProvider({ children }) {
  const {
    logged, loading, signIn, signOut,
  } = useAuth();

  const providerValue = useMemo(() => ({
    loading, logged, signIn, signOut,
  }), []);

  return (
    <Context.Provider value={providerValue}>
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };
