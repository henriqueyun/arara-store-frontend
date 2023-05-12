import { useState, useEffect } from 'react';

import { Navigate } from 'react-router-dom';
import { client } from '../../../client';
import { setAuth } from '../../../client/client';

export default function useAuth() {
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (token) {
      setAuth(`Bearer ${JSON.parse(token)}`);
      setLogged(true);
    }

    setLoading(false);
  }, []);

  async function handleLogin(email, password) {
    const { data: { accessToken } } = await client.users.login({ email, password });
    sessionStorage.setItem('token', JSON.stringify(accessToken));
    setLogged(true);
    return Navigate('/home');
  }

  function handleLogout() {
    setLogged(false);
    sessionStorage.removeItem('token');
    setAuth(undefined);
    return Navigate('/home');
  }

  return {
    logged, loading, handleLogin, handleLogout,
  };
}
