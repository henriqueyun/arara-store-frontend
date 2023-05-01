import { ThemeProvider } from '@emotion/react';
import './App.css';
import { Menubar, Footer } from './components';
import Home from './pages/Home';
import theme from './theme/Theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Menubar></Menubar>
      <Home></Home>
      <Footer></Footer>
    </ThemeProvider >
  );
}

export default App;
