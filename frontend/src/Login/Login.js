import './Login.css';
import React from 'react';
import { useState } from 'react';

import { appContext } from '../App';
// import { useNavigate } from 'react-router-dom';

export default function Login() {

  const { credentials, setCredentials } = React.useContext(appContext);

  const [newFirstname, setNewFirstName] = useState();
  const [newLastname, setNewLastName] = useState();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
  const [accountCreation, setAccountCreation] = useState(false);

  async function loginUser(login) {
    return fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(login)
    })
      .then(data => data.json())
  }
  
  async function postNewUser(details) {
    return fetch('http://localhost:8080/login/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(details)
    })
      .then(data => data.json())
  }

  const handleLoginSubmit = async event => {
    event.preventDefault();
    const newCredentials = await loginUser({
      username,
      password
    });
    console.log(newCredentials);
    if (newCredentials.attempt === 'good') {
      setCredentials({ loggedIn: newCredentials.loggedIn, guest: false, username: newCredentials.username, firstname: newCredentials.firstname, lastname: newCredentials.lastname, id: newCredentials.id });
      localStorage.setItem('CurrentUser', JSON.stringify({ loggedIn: newCredentials.loggedIn, guest: false, username: newCredentials.username, firstname: newCredentials.firstname, lastname: newCredentials.lastname, id: newCredentials.id }));
    } else {
      alert(newCredentials.attempt);
    }
  }

  const handleNewUserSubmit = async event => {
    event.preventDefault();
    if(password !== passwordConfirm){
      alert('Passwords do not match, please try again.');
      return;
    }
    const newCredentials = await postNewUser({
      firstname: newFirstname,
      lastname: newLastname,
      username,
      password
    });
    if (newCredentials.attempt === 'good') {
      setCredentials({ loggedIn: newCredentials.loggedIn, guest: false, username: newCredentials.username, firstname: newCredentials.firstname, lastname: newCredentials.lastname, id: newCredentials.id });
      localStorage.setItem('CurrentUser', JSON.stringify({ loggedIn: newCredentials.loggedIn, guest: false, username: newCredentials.username, firstname: newCredentials.firstname, lastname: newCredentials.lastname, id: newCredentials.id }));
    } else {
      alert(newCredentials.attempt);
    }
  }

  const swapLoginView = () => {
    setNewFirstName('');
    setNewLastName('');
    setUserName('');
    setPassword('');
    setPasswordConfirm('');
    setAccountCreation(!accountCreation);
  }

  if (accountCreation) {
    return (
      <div className='loginPageContainer'>
        <div className="loginWrapperContainer">
          <h1>New Account Information</h1>
          <form className="loginWrapper" onSubmit={handleNewUserSubmit}>
            <label>
              <p>First Name</p>
              <input type="text" value={newFirstname} onChange={e => setNewFirstName(e.target.value)} />
            </label>
            <label>
              <p>Last Name</p>
              <input type="text" value={newLastname} onChange={e => setNewLastName(e.target.value)} />
            </label>
            <label>
              <p>Username</p>
              <input type="text" onChange={e => setUserName(e.target.value)} />
            </label>
            <label>
              <p>Password</p>
              <input type="password" onChange={e => setPassword(e.target.value)} />
            </label>
            <label>
              <p>Confirm Password</p>
              <input type="password" onChange={e => setPasswordConfirm(e.target.value)} />
            </label>
            <div className='buttonContainer' >
              <button type="submit">Submit</button>
              <button type='button' onClick={swapLoginView}>Back to login</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className='loginPageContainer'>
      <div className="loginWrapperContainer">
        <h1>Log In</h1>
        <form className="loginWrapper" onSubmit={handleLoginSubmit}>
          <label>
            <p>Username</p>
            <input type="text" value={username} onChange={e => setUserName(e.target.value)} />
          </label>
          <label>
            <p>Password</p>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </label>
          <div className='buttonContainer' >
            <button type="submit">Submit</button>
            <button type='button' onClick={swapLoginView}>Create a new account</button>
          </div>
        </form>
      </div>
    </div>
  )
}