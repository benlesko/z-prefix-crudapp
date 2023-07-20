import React, { useEffect, useState } from "react";
import './LandingPage.css';
import ItemDisplay from "../ItemDisplay/ItemDisplay";
import NewItemForm from "../NewItemForm/NewItemForm";
import { appContext } from '../App';

export default function LandingPage() {

  const { credentials } = React.useContext(appContext);

  const [itemsList, setItemsList] = useState([{ itemname: '', quantity: 0, description: '' }]);
  const [isEditable, setIsEditable] = useState(false);
  const [saveEdit, setSaveEdit] = useState(false);
  const [targetItem, setTargetItem] = useState({ active: false, itemId: 1 })
  const [creatingNewItem, setCreatingNewItem] = useState(false);
  const [allItemView, setAllItemView] = useState(false);

  useEffect(() => {

    if (credentials?.guest || allItemView) {
      fetch('http://localhost:8080/inventory/all')
        .then(response => response.json())
        .then(data => {
          setItemsList(data);
        })
        .catch(error => console.log(`Failed with error: ${error}`));
    } else {
      fetch(`http://localhost:8080/inventory/${credentials?.id}`)
        .then(response => response.json())
        .then(data => {
          setItemsList(data);
        })
        .catch(error => console.log(`Failed with error: ${error}`));
    }

  })

  const handleToggleEdit = () => {
    if (isEditable) {
      setIsEditable(!isEditable);
      window.location.reload();
    }
    setIsEditable(!isEditable);
  }

  const handleSaveEdit = () => {
    setSaveEdit(true);
  }

  const handleAllItemViewChange = () => {
    setAllItemView(!allItemView);
  }

  //Guest login
  if (credentials?.guest) {
    return (
      <div className='landingPageContainer'>
        <div className="landingPageContentContainer">
          <div className="inventoryViewContainerGuest">
            {itemsList[0] ? <></> : <div className="noItemTextContainer">No items yet!</div>}
            {targetItem?.active ?
              <div className="individualItemViewContainer">
                <ItemDisplay targetItem={targetItem} setTargetItem={setTargetItem} index={itemsList.map(item => item.id).indexOf(targetItem.itemId)} item={itemsList.filter(item => item.id === targetItem.itemId)[0]} itemsList={itemsList} setItemsList={setItemsList}
                  isEditable={isEditable} setIsEditable={setIsEditable} saveEdit={saveEdit} setSaveEdit={setSaveEdit} />
                <button onClick={() => { setTargetItem({ active: false, itemId: 1 }) }}>Back to Inventory</button>
              </div> :
              <div className="inventoryViewContainerInternal">
                {itemsList.map((item, index) => {
                  return (<ItemDisplay setTargetItem={setTargetItem} index={index} item={item} itemsList={itemsList} setItemsList={setItemsList}
                    isEditable={isEditable} setIsEditable={setIsEditable} saveEdit={saveEdit} setSaveEdit={setSaveEdit} />)
                })}
              </div>
            }
          </div>
        </div>
      </div>
    )
  }

  //Inventory manager login
  return (
    <div className='landingPageContainer'>
      <div className="landingPageContentContainer">

        <div className="inventoryOptionsContainer">

          {!isEditable ?
            <>
              <div className="inventoryOptionsContainerButtonContainer"><button onClick={() => { setCreatingNewItem(true) }}>Create a new item</button></div>
              {!targetItem?.active ?
                <div className="inventoryOptionsContainerButtonContainer">
                  {allItemView ? <button onClick={() => { handleAllItemViewChange() }}>View Your Items</button> :
                    <button onClick={() => { handleAllItemViewChange() }}>View All Items</button>}
                </div> : <></>}
            </> : <></>}

          {isEditable ?
            <div className="editOptionsButtonContainer">
              <button onClick={handleSaveEdit}>Save</button>
              <button onClick={handleToggleEdit}>Cancel</button>
            </div>
            :
            allItemView ? <></> :
              <div className="inventoryOptionsContainerButtonContainer"><button onClick={handleToggleEdit}>Toggle Edit</button></div>
          }
        </div>

        {creatingNewItem ?

          <div className="createNewItemViewContainer">
            <NewItemForm setCreatingNewItem={setCreatingNewItem} />
            <button className='exitNewItemButton' onClick={() => { setCreatingNewItem(false) }}>Go Back</button>
          </div>
          :
          <div className="inventoryViewContainer">
            {itemsList[0] ? <></> : <div className="noItemTextContainer">No items yet!</div>}
            {targetItem?.active ?
              //Individual view
              <div className="individualItemViewContainer">
                <ItemDisplay allItemView={allItemView} targetItem={targetItem} setTargetItem={setTargetItem} index={itemsList.map(item => item.id).indexOf(targetItem.itemId)} item={itemsList.filter(item => item.id === targetItem.itemId)[0]} itemsList={itemsList} setItemsList={setItemsList}
                  isEditable={isEditable} setIsEditable={setIsEditable} saveEdit={saveEdit} setSaveEdit={setSaveEdit} />
                <button onClick={() => { setTargetItem({ active: false, itemId: 1 }) }}>Back to Inventory</button>
              </div> :
              //List view
              <div className="inventoryViewContainerInternal">
                {itemsList.map((item, index) => {
                  return (<ItemDisplay allItemView={allItemView} setTargetItem={setTargetItem} index={index} item={item} itemsList={itemsList} setItemsList={setItemsList}
                    isEditable={isEditable} setIsEditable={setIsEditable} saveEdit={saveEdit} setSaveEdit={setSaveEdit} />)
                })}
              </div>
            }
          </div>

        }

      </div>
    </div>
  )
}