import gql from 'graphql-tag';

export const createUser = gql`
mutation
  {
    createUser(userInput: {email: $email, password: $password}) {
      _id
      email
    }
  }
`;

export const loginQuery = gql`
query login($email: String!, $password: String!)
  {
    login(email: "$email", password: "$password") {
      userId
      token
      tokenExpiration
    }
  }
`;
