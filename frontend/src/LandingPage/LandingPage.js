import React from "react";
import './LandingPage.css';
import { appContext } from '../App';

export default function LandingPage() {

  const {credentials, setCredentials} = React.useContext(appContext);

  const logOut = () =>{
    localStorage.removeItem('CurrentUser')
    setCredentials({loggedIn: false, guest: true, username: '', firstname: '', lastname: '', id: null});
  }

  return (
    <div className='landingPageContainer'>
      Landing Page
      {credentials?.loggedIn?<button onClick={() => {logOut()}}>Log Out</button>:<button onClick={() => {logOut()}}>Log In</button>}
    </div>
  )
}