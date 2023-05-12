import { ThemeProvider } from '@emotion/react';
import { RouterProvider } from 'react-router-dom';
import React from 'react';
import { Menubar, Footer } from './components';
import router from './router';
import { theme } from './theme';
import './App.css';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Menubar />
        {/* TODO: add router for user navigation between pages */}
        <RouterProvider router={router} />
        <Footer />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
