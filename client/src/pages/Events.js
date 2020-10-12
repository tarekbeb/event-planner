import React, { Component } from 'react';
import { isEmpty } from 'lodash';

// Material UI components imports
import {
  IconButton,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Modal,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// Styles imports
import '../styles/Event.css'
import '../styles/index.css'

// Context
import AuthContext from '../context/auth-context';

// Components
import EventCardListing from '../shared/EventCardListing';

const AddEventForm = ({ errorMessage, fieldsArray, submitHandler, onFormChange, state, props }) => (
  /**
   * @function AddEventForm
   * @param {Object} props - Props that are passed from EventPage class
   * @returns {Component} - Form that takes event title, description, date and price
   */
  <form className="auth-form-container" onSubmit={(e) => submitHandler(e)}>
    <Typography variant="h4" component="h2">
      Create Event
    </Typography>
    <Typography variant="subtitle1" gutterBottom>
      Please fill our the information below to create your event.
    </Typography>
    <div className="form-control">
      {
        fieldsArray.map(field => (
          <TextField
            onChange={(e) => onFormChange(e, field.type)}
            // ref={field.ref}
            id="standard-required"
            className="text-field"
            key={field.type}
            label={field.label}
            type={field.type}
            multiline={field.multiline}
            rows={field.multiline ? 4 : 1}
            rowsMax={4}
            required={field.required}
            error={state.error}
            helperText={state.error ? field => errorMessage(field.label) : ''}
            fullWidth
          />
        ))
      }
    </div>
    <div className="form-actions">
      <Button
        classes={{ root: 'contained-button' }}
        variant="contained"
        type="submit"
        disableElevation
      >
        Submit
      </Button>
    </div>
  </form>
);

class EventCreation extends Component {
  static contextType = AuthContext;

  constructor(props){
    super(props);
    this.state = {
      open: false,
      events: ['one', 'two', 'three'],
      title: '',
      description: '',
      price: '',
      date: '',
      error: false
    }
  }

  // componentDidMount() {
  //   this.fetchEvents();
  // }

  handleCreateEventModalOpen = () => {
    /**
      * @function handleCreateEventModalOpen
      * @param none
      * @returns - Sets open state to true
    */
   this.setState({
    open: true
  });
  }

  handleCreateEventModalClose = () => {
    /**
      * @function handleCreateEventModalClose
      * @param none
      * @returns - Sets open state to false
    */
    this.setState({
      open: false
    });
  }

  onFormChange = (e, inputField) => {
    /**
      * @function onFormChange
      * @param {Object} e - event
      * @param inputField - input field type
    */
    const value = e.target.value;
    switch (inputField){
      case 'title': this.setState({ title: value});
        break;
      case 'price': this.setState({ price: value })
        break;
      case 'date': this.setState({ date: value })
        break;
      case 'description': this.setState({ description: value })
        break;
      default: return null;
    }
  }

  submitHandler = (e) => {
    /**
      * @function submitHandler
      * @param e - event
    */
    e.preventDefault();
    const title = this.state.title;
    const price = parseFloat(this.state.price);
    const date = this.state.date;
    const description = this.state.description;
    if (isEmpty(title) || isEmpty(date) || isEmpty(description)) {
      this.setState({
        error: true
      })
      return;
    }
    const eventInput = {title, price, date, description};
    console.log(eventInput);
    const requestBody = {
      query:`
        mutation {
          createEvent(eventInput: {
            title: "${title}",
            description: "${description}",
            price: "${price}",
            date: "${date}"
          }) {
            _id
            title
            price
          }
        }
      `
    }
    const token = this.context.token;
    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    .then(resData => {
      console.log(resData);
    })
  }

  fetchEvents = () => {
    /**
      * @function fetchEvents
      * @param none
      * @returns {Array} - List of events from DB
    */
    const requestBody = {
      query: `
        query {
          events {
            _id
            title
            price
          }
        }
      `
    };

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(resData => {
      const eventsArr = resData.data.events;
      this.setState({
        events: eventsArr
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    const fieldsArray = [
    {
      label: 'Event Title',
      type: 'title',
      multiline: false,
      required: true,
      ref: this.titleElRef
    },
    {
      label: 'Price',
      type: 'price',
      multiline: false,
      required: true,
      ref: this.priceElRef
    },
    {
      label: 'Date',
      type: 'date',
      multiline: false,
      required: true,
      ref: this.dateElRef
    },
    {
      label: 'Description',
      type: 'description',
      multiline: true,
      required: false,
      ref: this.descriptionElRef
    }
  ];
    const { handleCreateEventModalOpen, handleCreateEventModalClose, onFormChange, submitHandler } = this;
    const { open, events } = this.state;
    const errorMessage = label => `${label} is required*`;
    // const noEventsPresent = events.length === 0;
    const noEventsPresent = false;
    const token = localStorage.getItem('token');
    return (
      <>
        {token && (
          <Card variant="outlined" className="create-event-card">
            <Typography variant="h4" component="h2" classes={{ root: 'card-header' }}>
              Welcome to the events page!
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Would you like to create an event?
            </Typography>
            <Button
              classes={{ root: 'contained-button' }}
              variant="contained"
              type="submit"
              disableElevation
              onClick={handleCreateEventModalOpen}
            >
              Create Event
            </Button>
          </Card>
        )}
        {noEventsPresent
        ? (
          <Typography variant="h4" component="h2" classes={{ root: 'events-list' }}>
            There are currently no events available!
          </Typography>
        ) : (
          <EventCardListing events={events} />
        )}
        <Modal open={open} onClose={handleCreateEventModalClose}>
          <Card variant="outlined">
            <CardContent>
              <IconButton>
                <ArrowBackIcon fontSize="small" onClick={handleCreateEventModalClose} />
              </IconButton>
              <AddEventForm 
                errorMessage={errorMessage}
                fieldsArray={fieldsArray}
                onFormChange={onFormChange}
                submitHandler={submitHandler}
                state={this.state}
                {...this.props}
              />
            </CardContent>
          </Card>
        </Modal>
      </>
    )
  }
}

export default EventCreation;