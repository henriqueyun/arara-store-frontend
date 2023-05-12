import { ThemeProvider } from '@emotion/react';
import { RouterProvider } from 'react-router-dom';
import React from 'react';
import { Menubar, Footer } from './components';
import theme from './theme/Theme';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import router from './router';

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
