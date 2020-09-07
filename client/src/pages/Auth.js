import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import { createUser, loginQuery } from '../graphql/auth';
import '../styles/Auth.css'
import AuthContext from '../context/auth-context';

class AuthPage extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state= {
      email: '',
      password: '',
      emailError: false,
      passError: false,
      isLogin: true
    }
  }

  handleLoginToSignup = () => {
    this.setState(preState => {
      return { isLogin: !preState.isLogin}
    })
  }

  formOnChange = (e, inputField) => {
    const value = e.target.value;
    if (inputField === 'email') {
      this.setState({ email: value})
    } else {
    this.setState({ password: value})
    }
  }

  submitHandler = (e) => {
    e.preventDefault();
    let requestBody = {};
    const email = this.state.email;
    const password = this.state.password;
    if (email.trim().length === 0) {
      this.setState({ emailError: true });
      return;
    }
    if (password.trim().length === 0) {
      this.setState({ passError: true });
      return;
    }
    if (this.state.isLogin) {
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
    } else {
      requestBody = {
        query: `
          mutation
            {
              createUser(userInput: {email: "${email}", password: "${password}"}) {
                _id
                email
              }
            }
        `
      };
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
    const { emailError, passError, isLogin } = this.state;
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
                onChange={(e) => this.formOnChange(e, 'email')}
                ref={this.emailEl}
                id="standard-required"
                className="text-field"
                label="Email"
                error={emailError}
                helperText={emailError ? 'required' : ''}
                fullWidth
              />
              <TextField
                onChange={(e) => this.formOnChange(e, 'password')}
                ref={this.passwordEl}
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                error={passError}
                helperText={passError ? 'required' : ''}
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