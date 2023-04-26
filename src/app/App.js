import { ThemeProvider } from '@emotion/react';
import './App.css';
import { Menubar, Footer } from './components';
import Home from './pages/Home';
import theme from './theme/Theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Menubar></Menubar>
        <Home></Home>
        <Footer></Footer>
        <header className="App-header">
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
