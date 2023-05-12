import { useState, useEffect } from 'react';
import { setAuth } from '../../../client/client';
import { client } from '../../../client';

export default function useAuth() {
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (token) {
      setAuth(`Bearer ${JSON.parse(token)}`)
      setLogged(true);
    }

    setLoading(false);
  }, []);

  // TODO: refactor to use navigate inside here
  async function signIn(email, password) {
    try {
      const { data: { accessToken } } = await client.auth.signIn({ email, password });
      sessionStorage.setItem('token', JSON.stringify(accessToken));
      setLogged(true);
      return true
    } catch (error) {
      return false
    }
  }

  function signOut() {
    setAuth(undefined)
    setLogged(false);
  }

  return { logged, loading, signIn, signOut };
}