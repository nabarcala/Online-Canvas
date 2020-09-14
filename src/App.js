import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import Canvas from './components/Canvas';

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
