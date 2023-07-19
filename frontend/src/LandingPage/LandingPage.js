import React, { useEffect, useState } from "react";
import './LandingPage.css';
import ItemDisplay from "../ItemDisplay/ItemDisplay";
// import { appContext } from '../App';

export default function LandingPage() {

  // const {credentials, setCredentials} = React.useContext(appContext);

  const [itemsList, setItemsList] = useState([{itemname: '', quantity: 0, description:''}]);
  const [isEditable, setIsEditable] = useState(false);
  const [saveEdit, setSaveEdit] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/inventory/all')
    .then(response => response.json())
    .then(data => {
      setItemsList(data);
    })
    .catch(error => console.log(`Failed with error: ${error}`));
  },[saveEdit])

  const handleToggleEdit = () => {
    if(isEditable){
      setIsEditable(!isEditable);
      window.location.reload();
    }
    setIsEditable(!isEditable);
  }

  const handleSaveEdit = () => {
    setSaveEdit(true);
  }


  return (
    <div className='landingPageContainer'>
      <div className="landingPageContentContainer">

        <div className="inventoryOptionsContainer">
          <div className="inventoryOptionsContainerButtonContainer"><button onClick={() => {}}>Create a new item</button></div>
          <div className="inventoryOptionsContainerButtonContainer"><button onClick={() => {}}>View entire inventory</button></div>
          {isEditable?
            <div className="editOptionsButtonContainer">
              <button onClick={handleSaveEdit}>Save</button>
              <button onClick={handleToggleEdit}>Cancel</button>
            </div>
            :
            <div className="inventoryOptionsContainerButtonContainer">
            <button onClick={handleToggleEdit}>Toggle Edit</button>
            </div>
          }
        </div>
        
        <div className="inventoryViewContainer">
          <div className="inventoryViewContainerInternal">
            {itemsList.map((item, index) => {
              return(<ItemDisplay index = {index} item = {item} itemsList = {itemsList} setItemsList = {setItemsList}
                isEditable = {isEditable} setIsEditable = {setIsEditable} saveEdit = {saveEdit} setSaveEdit = {setSaveEdit}/>)
            })}
        </div>
        </div>
      </div>
    </div>
  )
}