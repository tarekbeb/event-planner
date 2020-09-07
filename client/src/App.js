import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { AuthPage, Events, Bookings } from './pages/index';
import { Navigation } from './shared/index';
import AuthContext from './context/auth-context';

import './styles/App.css';

class App extends Component {
  state = {
    userId: null,
    token: null,
    tokenExpiration: null
  }

  login = (userId, token, tokenExpiration) => {
    this.setState({ token: token, userId: userId, tokenExpiration: tokenExpiration })
  }

  logout = () => {
    this.setState({ token: null, userId: null, tokenExpiration: null })
  }

  render() {
    const { userId, token, tokenExpiration } = this.state;
    return (
      <BrowserRouter>
        <AuthContext.Provider
          value={{
            userId: userId,
            token: token,
            tokenExpiration: tokenExpiration,
            login: this.login,
            logout: this.logout
          }}
        >
          <Navigation />
          <main className="main-content">
            <Switch>
              {!token && <Redirect from="/" to="/login" exact />}
              {token && <Redirect from="/" to="/events" exact />}
              {token && <Redirect from="/login" to="/events" exact />}
              {!token && <Redirect from="/bookings" to="/login" exact />}
              <Redirect from="/logout" to="/login" exact />
              <Route path="/login" component={AuthPage} />
              <Route path="/events" component={Events} />
              <Route path="/bookings" component={Bookings} />
            </Switch>
          </main>
        </AuthContext.Provider>
      </BrowserRouter>
    );
  };
}

export default App;
