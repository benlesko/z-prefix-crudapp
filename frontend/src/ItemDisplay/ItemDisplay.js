import React , {useState, useEffect} from "react";
import './ItemDisplay.css';
import _ from 'lodash';
// import { appContext } from '../App';

export default function ItemDisplay(props) {

  // const {credentials, setCredentials} = React.useContext(appContext);
  const {saveEdit, setSaveEdit, isEditable, setIsEditable, setTargetItem, targetItem} = props;

  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState(0);
  const [itemDesc, setItemDesc] = useState('');

  useEffect(() => {
    setItemName(props.item?.itemname);
    setItemQuantity(props.item?.quantity);
    setItemDesc(props.item?.description);
  },[props.item?.itemname, props.item?.quantity, props.item?.description])

  useEffect(() => {
    if(props.saveEdit){
      saveAllEdits();
      setSaveEdit(false);
      setIsEditable(false);
    }
  })

  async function deleteItem () {
    if(targetItem?.active){
      setTargetItem({active: false, itemId: 1});
    }
    return fetch(`http://localhost:8080/inventory/${props.item?.id}`, {
      method: 'DELETE'
    })
      .then(data => {
        //kinda hacky way to re-render without extra state
        setSaveEdit(!saveEdit);
        setSaveEdit(!saveEdit);
        return(data.json())
      })
  }

  async function patchNewEdits (details) {
    return fetch(`http://localhost:8080/inventory/${props.item?.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(details)
    })
      .then(data => data.json())
  }

  const saveAllEdits = () => {
    let updatedItem = props.itemsList[props.index];
    updatedItem = {...props.itemsList[props.index], itemname: itemName, quantity: itemQuantity, description: itemDesc};
    
    if(!_.isEqual(updatedItem, props.itemsList[props.index])){
      patchNewEdits(updatedItem);
    }

  }

  const handleTitleEdit = (event) => {
    setItemName(event.target.innerText)
  }

  const handleQuantityEdit = (event) => {
    setItemQuantity(event.target.innerText)
  }

  const handleDescEdit = (event) => {
    setItemDesc(event.target.innerText)
  }


  return (
    <div className='itemDisplayContainer'>
      <div className="itemNameText" contentEditable={isEditable} suppressContentEditableWarning={true} onInput={handleTitleEdit}>
        {props.item?.itemname}</div>
      <div className="itemQuantityText">
        <div>Quantity:&nbsp;</div>
        <div contentEditable={isEditable} suppressContentEditableWarning={true} onInput={handleQuantityEdit}>{props.item?.quantity}</div>
      </div>
      <div className="itemDescText" contentEditable={isEditable} suppressContentEditableWarning={true} onInput={handleDescEdit}>
        { isEditable || targetItem?.active? props.item?.description:
        props.item?.description.length > 100? props.item?.description.slice(0,100)+'...' : props.item?.description }
      </div>
      {isEditable?<></>:
      <div className="itemButtonContainer">
        {targetItem?.active?<></>:<button onClick={() => {setTargetItem({active: true, itemId: props.item?.id})}}>View</button>}
        <button onClick={() => {deleteItem()}}>Delete</button>
      </div>
      }
    </div>
  )
}