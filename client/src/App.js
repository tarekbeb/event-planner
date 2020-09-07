import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { AuthPage, Events, Bookings } from './pages/index';
import { Navigation } from './shared/index';

import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Navigation />
      <Switch>
        <Redirect from="/" to="/auth" exact />
        <Route path="/auth" component={AuthPage} />
        <Route path="/events" component={Events} />
        <Route path="/bookings" component={Bookings} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
