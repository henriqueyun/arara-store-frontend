import { Button, Container } from '@mui/material';
import React, { useState } from 'react';
import { LoginService } from '../../client/services/login';

export default function Login() {
  const loginService = new LoginService();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function login() {
    await loginService.login({ login: email, password });
  }

  return (
    <Container maxWidth="xl">
      <Button onClick={login()}>
        <form action="">
          <label htmlFor="username">
            <p>Username</p>
            <input type="text" id="username" />
          </label>
          <label htmlFor="password">
            <p>Password</p>
            <input type="password" id="password" />
          </label>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </Button>
    </Container>
  );
}
