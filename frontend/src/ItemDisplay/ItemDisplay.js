import React from "react";
import './ItemDisplay.css';
import { appContext } from '../App';

export default function ItemDisplay() {

  const {credentials, setCredentials} = React.useContext(appContext);

  return (
    <div className='itemDisplayContainer'>
      <div>Item 1</div>
      <div>Item 1</div>
      <div>Item 1</div>
      <div>Item 1</div>
      <div>Item 1</div>
    </div>
  )
}