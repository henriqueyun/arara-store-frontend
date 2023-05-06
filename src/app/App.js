import { ThemeProvider } from '@emotion/react';
import { RouterProvider } from 'react-router-dom';
import { Menubar, Footer } from './components';
import { router } from './router';
import { theme } from './theme';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Menubar></Menubar>
      {/* TODO: add router for user navigation between pages */}
      <RouterProvider router={router} />
      <Footer></Footer>
    </ThemeProvider >
  );
}

export default App;
