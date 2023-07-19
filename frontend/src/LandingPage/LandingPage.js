import React, { useEffect, useState } from "react";
import './LandingPage.css';
import ItemDisplay from "../ItemDisplay/ItemDisplay";
import { appContext } from '../App';

export default function LandingPage() {

  const {credentials} = React.useContext(appContext);

  const [itemsList, setItemsList] = useState([{itemname: '', quantity: 0, description:''}]);
  const [isEditable, setIsEditable] = useState(false);
  const [saveEdit, setSaveEdit] = useState(false);
  const [targetItem, setTargetItem] = useState({active: false, itemId: 1})

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

  if(credentials?.guest){
    return (
      <div className='landingPageContainer'>
      <div className="landingPageContentContainer">
        <div className="inventoryViewContainerGuest">
        {targetItem?.active? 
          <div className="individualItemViewContainer">
            <ItemDisplay targetItem = {targetItem} setTargetItem = {setTargetItem} index = {itemsList.map(item=>item.id).indexOf(targetItem.itemId)} item = {itemsList.filter(item=>item.id === targetItem.itemId)[0]} itemsList = {itemsList} setItemsList = {setItemsList}
                isEditable = {isEditable} setIsEditable = {setIsEditable} saveEdit = {saveEdit} setSaveEdit = {setSaveEdit}/>
            <button onClick={() => {setTargetItem({active: false, itemId: 1})}}>Back to Inventory</button>
          </div>:
          <div className="inventoryViewContainerInternal">
            {itemsList.map((item, index) => {
              return(<ItemDisplay setTargetItem = {setTargetItem} index = {index} item = {item} itemsList = {itemsList} setItemsList = {setItemsList}
                isEditable = {isEditable} setIsEditable = {setIsEditable} saveEdit = {saveEdit} setSaveEdit = {setSaveEdit}/>)
            })}
          </div>
        }
        </div>
      </div>
    </div>
    )
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
        {targetItem?.active? 
          <div className="individualItemViewContainer">
            <ItemDisplay targetItem = {targetItem} setTargetItem = {setTargetItem} index = {itemsList.map(item=>item.id).indexOf(targetItem.itemId)} item = {itemsList.filter(item=>item.id === targetItem.itemId)[0]} itemsList = {itemsList} setItemsList = {setItemsList}
                isEditable = {isEditable} setIsEditable = {setIsEditable} saveEdit = {saveEdit} setSaveEdit = {setSaveEdit}/>
            <button onClick={() => {setTargetItem({active: false, itemId: 1})}}>Back to Inventory</button>
          </div>:
          <div className="inventoryViewContainerInternal">
            {itemsList.map((item, index) => {
              return(<ItemDisplay setTargetItem = {setTargetItem} index = {index} item = {item} itemsList = {itemsList} setItemsList = {setItemsList}
                isEditable = {isEditable} setIsEditable = {setIsEditable} saveEdit = {saveEdit} setSaveEdit = {setSaveEdit}/>)
            })}
          </div>
        }
        </div>
        
      </div>
    </div>
  )
}