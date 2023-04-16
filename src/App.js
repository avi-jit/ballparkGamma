
import './App.css';

import Game from './components/Game';
import Header from './components/Header';

function App() {
  return (
    <div className="App" style={{backgroundColor:"#23272c"}}>
      <Header/>
      <br />
      <Game />
    </div>
  );
}

export default App;
