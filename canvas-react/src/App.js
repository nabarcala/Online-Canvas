import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import Canvas from './Canvas';
import Top from './Toolbar/Top';
import Left from './Toolbar/Left';

function App() {

  return (
    <div className="App">
      <Router>
        <Canvas />
        
        
        {/* <Switch>
          <Route path='/' exact component={Home} />
        </Switch> */}
      </Router>
    </div>
  );
}

export default App;
