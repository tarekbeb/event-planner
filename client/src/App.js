import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { AuthPage, Events, Bookings } from './pages/index';
import { Navigation } from './shared/index';

import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
    <Navigation />
    <main className="main-content">
      <Switch>
        <Redirect from="/" to="/auth" exact />
        <Route path="/auth" component={AuthPage} />
        <Route path="/events" component={Events} />
        <Route path="/bookings" component={Bookings} />
      </Switch>
    </main>
    </BrowserRouter>
  );
}

export default App;
