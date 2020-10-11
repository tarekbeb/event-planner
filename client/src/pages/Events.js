import React, { Component } from 'react';

// Material UI components imports
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class AuthPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      description: '',
      price: '',
      date: '',
      error: false
    }
  }

  submitHandler = () => {

  }

  render() {
    const isLogin = true;
    const fieldsArray = [
      {
        label: 'Event Title',
        type: 'event',
        multiline: false
      },
      {
        label: 'Price',
        type: 'price',
        multiline: false
      },
      {
        label: 'Date',
        type: 'date',
        multiline: false
      },
      {
        label: 'Description',
        type: 'description',
        multiline: true
      }
    ];
    const errorMessage = label => `${label} is required*`;
    return (
      <form className="auth-form-container" onSubmit={(e) => this.submitHandler(e)}>
        <Card variant="outlined" className="auth-form-card">
          <CardContent>
            <Typography variant="h4" component="h2">
              Event Creation
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Please fill our the information below to create you event.
            </Typography>
            <div className="form-control">
              {
                fieldsArray.map(field => (
                  <TextField
                    // onChange={(e) => this.formOnChange(e, 'email')}
                    ref={`this.${field.type}El`}
                    id="standard-required"
                    className="text-field"
                    key={field.type}
                    label={field.label}
                    multiline={field.multiline}
                    rows={field.multiline ? 4 : 1}
                    rowsMax={4}
                    error={this.state.error}
                    helperText={this.state.error ? field => errorMessage(field.label) : ''}
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
                {isLogin ? 'Login' : 'Signup'}
              </Button>
              <Button
                className="text-button"
                onClick={() => this.handleLoginToSignup()}
              >
                Switch to {isLogin ? 'Signup': 'Login'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    )
  }
}

export default AuthPage;