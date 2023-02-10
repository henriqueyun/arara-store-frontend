import { ThemeProvider } from '@emotion/react';
import './App.css';
import Menubar from './components/Menubar.js'
import theme from './theme/Theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Menubar></Menubar>
        <header className="App-header">
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
