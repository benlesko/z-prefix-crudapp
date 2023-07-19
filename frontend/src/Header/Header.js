import React from "react";
import { useState, useEffect } from "react";
import './Header.css';
import { appContext } from '../App';

//Outside components
import Toggle from "react-toggle";
import "react-toggle/style.css"

export default function Header() {

  const { credentials, setCredentials } = React.useContext(appContext);

  const [darkMode, setDarkMode] = useState('true');

  const logOut = () => {
    localStorage.removeItem('CurrentUser')
    setCredentials({ loggedIn: false, guest: true, username: '', firstname: '', lastname: '', id: null });
  }

  //Dark mode switching
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className='headerContainer'>
      <div className='welcomeTextContainer'>
        {credentials?.loggedIn ?
          credentials?.guest ? <div>Welcome, guest</div> : <div>Welcome, {credentials.firstname}</div>
          : <div>Welcome</div>
        }
      </div>
      <div className="rightSideContainer">
        <div className="logoutButtonContainer">{credentials?.loggedIn ? <button onClick={() => { logOut() }}>Log Out</button> : <></>}</div>
        <div className='toggleContainer'>
          <Toggle className='themeToggle' checked={darkMode} onChange={() => { setDarkMode(!darkMode) }} />
          <div className="toggleText">Dark Mode</div>
        </div>
      </div>
    </div>
  )
}