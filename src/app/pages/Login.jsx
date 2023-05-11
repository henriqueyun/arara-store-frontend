import { Button, Container, FormLabel, InputLabel } from '@mui/material';
import React, { useState } from 'react';
import { client } from '../../client';

export default function Login() {
  const [email, setEmail] = useState('felipe@gmail.com');
  const [password, setPassword] = useState('12345678');

  async function login(event) {
    event.preventDefault();
    const userToken = await client.users.login({ email, password });
    sessionStorage.setItem('token', JSON.stringify(userToken))
  }

  return (
    <>
     <Container maxWidth="xl" justifyContent="center" >
        <form onSubmit={(e) => login(e)}>
          <label htmlFor="username">
            <p>Username</p>
            <input type="text" id="username" onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label htmlFor="password">
            <p>Password</p>
            <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
          </label>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
     </Container>
    </>
  )
}