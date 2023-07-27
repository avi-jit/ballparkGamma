
import './App.css';

import Game from './components/Game';
import Header from './components/Header';
import ReactGA from 'react-ga';

ReactGA.initialize("UA-275459114-1")
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
