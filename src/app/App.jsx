import { ThemeProvider } from '@emotion/react';
import { RouterProvider } from 'react-router-dom';
import React from 'react';
import { Menubar, Footer } from './components';
import { router } from './router';
import { theme } from './theme';
import './App.css';

function App() {
  // const [token, setToken] = useState();

  // if (!token) {
  //   return <Login setToken={setToken} />;
  // }
  return (
    <ThemeProvider theme={theme}>
      <Menubar />
      {/* TODO: add router for user navigation between pages */}
      <RouterProvider router={router} />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
