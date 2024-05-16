import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { AUTH_TOKEN } from '../constants';

import '../styles/Login.css';

const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $username: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      username: $username
      email: $email
      password: $password
    ) {
      user{
        id
        username
        email
      }
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation(
    $username: String!, 
    $password: String!
  ) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;
const Login = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    login: true,
    email: '',
    username: '',
    password: ''
  });

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      username: formState.username,
      password: formState.password
    },
    onCompleted: ({tokenAuth}) => {
      localStorage.setItem(AUTH_TOKEN, tokenAuth.token);
      console.log(tokenAuth.token)
      navigate('/');
    }
  });
  
  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: {
      username: formState.username,
      email: formState.email,
      password: formState.password
    },
    onCompleted: ({ createUser }) => {
      console.log(createUser.user)
      // localStorage.setItem(AUTH_TOKEN, signup.token);
      navigate('/');
    }
  });

  return (
    <div className="login-container">
      <h2 className="login-title">{formState.login ? "INICIAR SECION" : "REGISTRATE"}</h2>
      <div className="flex flex-column align-center">
        {!formState.login && (
          <input
            value={formState.email}
            onChange={(e) =>
              setFormState({
                ...formState,
                email: e.target.value
              })
            }
            type="text"
            placeholder="Your email"
            className="input-field"
          />
        )}
        <input
          value={formState.username}
          onChange={(e) =>
            setFormState({
              ...formState,
              username: e.target.value
            })
          }
          type="text"
          placeholder="Your username"
          className="input-field"
        />
        <input
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value
            })
          }
          type="password"
          placeholder="Choose a safe password"
          className="input-field"
        />
      </div>
      <div className="flex mt3">
        <button
          className="pointer mr2 button"
          onClick={formState.login ? login : signup}
        >
          {formState.login ? "LOGIN" : "create account"}
        </button>
        <button
          className="pointer button"
          onClick={(e) =>
            setFormState({
              ...formState,
              login: !formState.login,
            })
          }
        >
          {formState.login
            ? "need to create an account?"
            : "already have an account?"}
        </button>
      </div>
    </div>
  );
};

export default Login;