import { useState, useEffect } from 'react';

import { client } from '../../../client';
import { Navigate } from 'react-router-dom';

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newToken, setNewToken] = useState();
  
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    
    console.log("🚀 ~ file: useAuth.jsx:9 ~ useAuth ~ loading:", loading)
    console.log("🚀 ~ file: useAuth.jsx:10 ~ useAuth ~ newToken:", newToken)
    if (token) {
      // api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    } 

    setLoading(false);
  }, []);
  
  async function handleLogin(email, password) {
    const { data: { access_token } } = await client.users.login({ email, password });

    sessionStorage.setItem('token', JSON.stringify(access_token));
    // api.defaults.headers.Authorization = `Bearer ${token}`;
    setAuthenticated(true);
    return Navigate('/home')
  }

  function handleLogout() {
    setAuthenticated(false);
    sessionStorage.removeItem('token');
    // api.defaults.headers.Authorization = undefined;
    return Navigate('/home')
  }
  
  return { authenticated, loading, handleLogin, handleLogout };
}