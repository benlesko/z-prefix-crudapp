import './Login.css';
import React from 'react';
import { useState, useEffect } from 'react';

import { appContext } from '../App';
// import { useNavigate } from 'react-router-dom';

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

export default function Login() {
  
  const {credentials, setCredentials} = React.useContext(appContext);

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async event => {
    event.preventDefault();
    const newCredentials = await loginUser({
      username,
      password
    });
    console.log(newCredentials);
    if(newCredentials.attempt === 'good'){
      setCredentials({loggedIn: newCredentials.loggedIn, guest: false, username: newCredentials.username, firstname: newCredentials.firstname, lastname: newCredentials.lastname, id:newCredentials.id});
    }else{
      alert(newCredentials.attempt);
    }
  }

  return (
    <div className='loginPageContainer'>
      <div className="loginWrapper">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Username</p>
            <input type="text" onChange={e => setUserName(e.target.value)} />
          </label>
          <label>
            <p>Password</p>
            <input type="password" onChange={e => setPassword(e.target.value)} />
          </label>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}