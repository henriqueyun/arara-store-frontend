import React, { createContext } from 'react';

import useAuth from './hooks/useAuth';

const Context = createContext();

function AuthProvider({ children }) {
  const {
    logged, loading, signIn, signOut,
  } = useAuth();

  return (
    <Context.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        logged, loading, signIn, signOut,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };
