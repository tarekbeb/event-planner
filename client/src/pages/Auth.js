import React, { Component } from 'react';

// Material UI components imports
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// Styles import
import '../styles/Auth.css'
import '../styles/index.css'

// Context
import AuthContext from '../context/auth-context';

class AuthPage extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state= {
      email: '',
      password: '',
      emailError: false,
      passwordError: false,
      isLogin: true
    }
  }

  handleLoginToSignup = () => {
    /**
      * This method switches API call based on state
      * @function handleLoginToSignup
      * @param empty
      * @returns {setState} - negates isLogin
   */
    this.setState(preState => {
      return { isLogin: !preState.isLogin}
    })
  }

  onFormChange = (e, inputField) => {
    /**
      onFormChange
        @param {Object} e - event
        @param inputField - input field type
    */
    const value = e.target.value;
    switch (inputField){
      case 'email': this.setState({ email: value});
        break;
      case 'password': this.setState({ password: value })
        break;
      default: return null;
    }
  }

  submitHandler = (e) => {
    /**
      submitHandler
        @param e: event
    */
    e.preventDefault();
    let requestBody = {};
    const isLogin = this.state.isLogin;
    const email = this.state.email;
    const password = this.state.password;
    if (email.trim().length === 0) {
      this.setState({ emailError: true });
      return;
    }
    if (password.trim().length === 0) {
      this.setState({ passwordError: true });
      return;
    }
    switch (isLogin) {
      case isLogin: (
        requestBody = {
          query: `
            query
              {
                login(email: "${email}", password: "${password}") {
                  userId
                  token
                  tokenExpiration
                }
              }
          `
        }
      );
        break;
      case !isLogin: (
        requestBody = {
          query: `
            mutation
              {
                createUser(userInput: {
                  email: "${email}",
                  password: "${password}"
                }) {
                  _id
                  email
                }
              }
          `
        }
      );
        break;
      default: return null;
    }
    
    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => {
      if(res.status !== 200 && res.status !== 201){
        throw new Error('Failed');
      }
      return res.json();
    })
    .then(resData => {
      if (resData.data.login.token) {
        this.context.login(resData.data.login.token, resData.data.login.userId, resData.data.login.tokenExpiration)
      }
    })
    .catch(err => {
      console.log(err);
    })
  }
  render() {
    const { emailError, passwordError, isLogin } = this.state;
    return (
      <form className="auth-form-container" onSubmit={(e) => this.submitHandler(e)}>
        <Card variant="outlined" className="auth-form-card">
          <CardContent>
            <Typography variant="h4" component="h2">
              Welcome!
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Please enter your email and password to continue.
            </Typography>
            <div className="form-control">
              <TextField
                onChange={(e) => this.onFormChange(e, 'email')}
                ref={this.emailEl}
                id="standard-required"
                className="text-field"
                label="Email"
                error={emailError}
                helperText={emailError ? 'required' : ''}
                fullWidth
              />
              <TextField
                onChange={(e) => this.onFormChange(e, 'password')}
                ref={this.passwordEl}
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                error={passwordError}
                helperText={passwordError ? 'required' : ''}
                fullWidth
              />
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