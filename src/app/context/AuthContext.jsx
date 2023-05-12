import React, { createContext } from 'react';

import useAuth from './hooks/useAuth';

const Context = createContext();

function AuthProvider({ children }) {
  const {
    authenticated, loading, signIn, signOut,
  } = useAuth();

  return (
    <Context.Provider value={{ loading, authenticated, signIn, signOut }}>
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };