import React from 'react';
import { NavLink, } from 'react-router-dom';

import AuthContext from '../context/auth-context';
import '../styles/navigation.css';


const Navigation = (props) => (
  <AuthContext.Consumer>
    {(context) => {
      return (
        <header className="main-navigation">
          <div className="main-navigation_logo">
            <h1>Event Planner</h1>
          </div>
          <nav className="main-navigation_items">
            <ul>
              <li>
                <NavLink to="/events">Events</NavLink>
              </li>
              {context.token &&
              <>
                <li>
                  <NavLink to="/bookings">Bookings</NavLink>
                </li>
                <li>
                  <NavLink to="/logout" onClick={() => context.logout()}>Logout</NavLink>
                </li>
              </>
              }
              {!context.token &&
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              }
              {!context.token &&
                <li>
                  <NavLink to="/signup">Signup</NavLink>
                </li>
              }
            </ul>
          </nav>
        </header>
      )
    }}
  </AuthContext.Consumer>
);

export default Navigation; 