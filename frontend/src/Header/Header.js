import React from "react";
import { useState, useEffect } from "react";
import './Header.css';
import { appContext } from '../App';

//Outside components
import Toggle from "react-toggle";
import "react-toggle/style.css"

export default function Header() {

  const {credentials} = React.useContext(appContext);

  const [darkMode, setDarkMode] = useState('true');

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
      {credentials?.loggedIn?
        credentials?.guest?<div>Welcome, guest</div>:<div>Welcome, {credentials.firstname}</div>
        :<div>Welcome</div>
      }
      <div className='toggleContainer'>
        <Toggle className='themeToggle' checked={darkMode} onChange={() => { setDarkMode(!darkMode) }} />&nbsp;Dark Mode
      </div>
    </div>
  )
}