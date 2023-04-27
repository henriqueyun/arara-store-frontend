import { ThemeProvider } from '@emotion/react';
import './App.css';
import { Menubar, Footer } from './components';
import Products from './pages/Products';
import theme from './theme/Theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Menubar></Menubar>
      {/* TODO: add router for user navigation between pages */}
      <Products></Products>
      <Footer></Footer>
    </ThemeProvider >
  );
}

export default App;
