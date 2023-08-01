
import './App.css';

import Game from './components/Game';
import Header from './components/Header';
import ReactGA from 'react-ga4';

ReactGA.initialize("G-3JLJSPT4Y5",{
  debug: true,
})
ReactGA.send({hitType: "pageview", page:"/"});
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
