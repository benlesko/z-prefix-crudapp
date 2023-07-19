import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect, createContext } from 'react';

//Local Components
import Login from './Login/Login';
import Header from './Header/Header';
import LandingPage from './LandingPage/LandingPage';

export const appContext = createContext();

function App() {

  const [credentials, setCredentials] = useState({loggedIn: false, guest: true, username: '', firstname: '', lastname: '', id: null});

  useEffect(() => {
    if (localStorage.getItem('CurrentUser') !== null) {
      setCredentials(JSON.parse(localStorage.getItem("CurrentUser")));
    }
  },[])

  if (!credentials?.loggedIn) {
    return (
      <appContext.Provider value={{credentials, setCredentials}}>
        <Header />
        <Login />
      </appContext.Provider>
    )
  }

  return (
    <appContext.Provider value={{credentials, setCredentials}}>
      <Header />
      <Routes>
        <Route path='/' element={<LandingPage />}/>
      </Routes>
    </appContext.Provider>
  );
}

export default App;
