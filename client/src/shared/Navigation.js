import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Navigation = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <NavLink to="/bookings">Bookings</NavLink>
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/authenticate">Authenticate</NavLink>
        </Tabs>
      </AppBar>
    </div>
  );
}

export default Navigation; 