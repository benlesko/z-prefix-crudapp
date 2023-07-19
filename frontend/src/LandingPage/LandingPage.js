import React from "react";
import './LandingPage.css';
import ItemDisplay from "../ItemDisplay/ItemDisplay";
import { appContext } from '../App';

export default function LandingPage() {

  const {credentials, setCredentials} = React.useContext(appContext);

  return (
    <div className='landingPageContainer'>
      <div className="landingPageContentContainer">

        <div className="inventoryOptionsContainer">
          <button onClick={() => {}}>Create a new item</button>
          <button onClick={() => {}}>View entire inventory</button>
          <button onClick={() => {}}>Toggle edit mode</button>
        </div>

        <div className="inventoryViewContainer">
          <div className="inventoryViewContainerInternal">
          <ItemDisplay />
          <ItemDisplay />
          <ItemDisplay />
          <ItemDisplay />
          <ItemDisplay />
          <ItemDisplay />
          <ItemDisplay />
          <ItemDisplay />
          <ItemDisplay />
        </div>
        </div>
      </div>
    </div>
  )
}