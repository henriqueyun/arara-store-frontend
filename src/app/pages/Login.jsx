import {  Container } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Context } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('felipe@gmail.com');
  const [password, setPassword] = useState('12345678');
  const { handleLogin } = useContext(Context);


  return (
    <>
     <Container maxWidth="xl" justifyContent="center" >
        <form >
          <label htmlFor="username">
            <p>Username</p>
            <input type="text" id="username" onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label htmlFor="password">
            <p>Password</p>
            <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
          </label>
          <div>
            <button type="button" onClick={handleLogin(email, password)}>Login</button>
          </div>
        </form>
     </Container>
    </>
  )
}