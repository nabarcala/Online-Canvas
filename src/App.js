import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import Canvas from './components/Canvas';
import Welcome from './components/Welcome';
// import Image from './components/Image';

function App() {

  return (
    <div className="App">
      <Router>
        {/* <Image /> */}
        <Welcome />
        <Canvas />
        
        
        {/* <Switch>
          <Route path='/' exact component={Home} />
        </Switch> */}
      </Router>
    </div>
  );
}

export default App;
