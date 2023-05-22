import { useState, useEffect } from 'react';
import { setAuth } from '../../../client/client';
import { client } from '../../../client';

export default function useAuth() {
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setAuth(`Bearer ${JSON.parse(token)}`);
      setLogged(true);
    }
    setLoading(false);
  }, []);

  // TODO: refactor to use navigate inside here
  async function signIn(email, password) {
    try {
      const {
        data: { accessToken, loggedUser },
      } = await client.auth.signIn({ email, password });
      localStorage.setItem('token', JSON.stringify(accessToken));
      localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
      setLogged(true);
      return true;
    } catch (error) {
      return false;
    }
  }

  function signOut() {
    try {
      localStorage.removeItem('token');
      setAuth(undefined);
      setLogged(false);
      return true;
    } catch (error) {
      return false;
    }
  }

  return {
    logged,
    loading,
    signIn,
    signOut,
  };
}
