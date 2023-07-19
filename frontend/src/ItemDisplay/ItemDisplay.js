import React , {useState, useEffect} from "react";
import './ItemDisplay.css';
import { appContext } from '../App';

export default function ItemDisplay(props) {

  const {credentials, setCredentials} = React.useContext(appContext);

  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState(0);
  const [itemDesc, setItemDesc] = useState('');

  useEffect(() => {
    setItemName(props.item?.itemname);
    setItemQuantity(props.item?.quantity);
    setItemDesc(props.item?.description);
  },[])

  useEffect(() => {
    if(props.saveEdit){
      console.log('saving...')
      saveAllEdits();
      props.setSaveEdit(false);
      props.setIsEditable(false);
    }
  },[props.saveEdit])

  const saveAllEdits = () => {
    let updatedItem = props.itemsList[props.index];
    updatedItem = {...props.itemsList[props.index], itemname: itemName, quantity: itemQuantity, description: itemDesc};
    console.log(updatedItem)
    // props.setItemsList(updatedList)

    // Send patch request if object is different
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
      <div className="itemNameText" contentEditable={props.isEditable} suppressContentEditableWarning={true} onInput={handleTitleEdit}>
        {props.item?.itemname}</div>
      <div className="itemQuantityText">
        <div>Quantity:&nbsp;</div>
        <div contentEditable={props.isEditable} suppressContentEditableWarning={true} onInput={handleQuantityEdit}>{props.item?.quantity}</div>
      </div>
      <div className="itemDescText" contentEditable={props.isEditable} suppressContentEditableWarning={true} onInput={handleDescEdit}>
        { props.isEditable? props.item?.description :
        props.item?.description.length > 100? props.item?.description.slice(0,100)+'...' : props.item?.description }
      </div>
    </div>
  )
}