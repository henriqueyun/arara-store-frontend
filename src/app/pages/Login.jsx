import { Button, Container } from "@mui/material";
import { LoginService } from "../../client/services/login";
import { useState } from "react";

export default function Login() {
  const loginService = new LoginService();
  const [email, setEmail] = useState()

  async function login() {
    await loginService.login({login: email, password: password})
  }

  return (
     <Container maxWidth="xl">
      <Button onClick={login()}>
    <form action="">      
      <label>
        <p>Username</p>
        <input type="text" />
      </label>
      <label>
        <p>Password</p>
        <input type="password" />
      </label>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
      </Button>
     </Container>
  )
}