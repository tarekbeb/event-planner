import React from 'react';
import { NavLink, } from 'react-router-dom';
import '../styles/navigation.css';


const Navigation = () => {
  return (
    <header className="main-navigation">
      <div className="main-navigation_logo">
        <h1>Event Planner</h1>
      </div>
      <nav className="main-navigation_items">
        <ul>
          <li>
            <NavLink to="/bookings">Bookings</NavLink>
          </li>
          <li>
            <NavLink to="/events">Events</NavLink>
          </li>
          <li>
            <NavLink to="/auth">Authenticate</NavLink>
            </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navigation; 