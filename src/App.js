import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import GameBoard from './pages/GameBoard';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import './styles/general.css';

class App extends Component {
  componentDidMount() {
    this.loadingRanking();
  }

  loadingRanking = () => {
    if (!JSON.parse(localStorage.getItem('ranking'))) {
      localStorage.setItem('ranking', '[]');
    }
  };

  render() {
    return (
      <Switch>
        {/* <Route exact path="/gameboard" render={ (props)
          => <GameBoard { ...props } /> } /> */}
        <Route exact path="/gameboard" component={ GameBoard } />
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="/feedback" component={ Feedback } />
        <Route exact path="/ranking" component={ Ranking } />
        <Route exact path="/" component={ Login } />
      </Switch>
    );
  }
}

export default App;
