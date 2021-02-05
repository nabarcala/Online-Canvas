import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import Canvas from './pages/Canvas/Canvas';
// import Home from './pages/Home/Home';
import LogIn from './pages/Auth/Login';
import Gallery from './pages/Gallery/Gallery';
// import Welcome from './components/Welcome';
// import Image from './components/Image';

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <Router>

          <Switch>
            <Redirect exact from='/' to='/canvas' />
            <Route path='/canvas' exact component={Canvas} /> 
            {/* <Route path='/home' exact component={Home} /> */}
            <Route path='/login' exact component={LogIn} />
            <Route path='/gallery' exact component={Gallery} />
          </Switch>

        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
