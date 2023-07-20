import './NewItemForm.css';
import React from 'react';
import { useState } from 'react';

import { appContext } from '../App';

export default function NewItemForm(props) {

  const { credentials } = React.useContext(appContext);

  const {setCreatingNewItem} = props;

  const [itemname, setItemName] = useState();
  const [quantity, setQuantity] = useState();
  const [description, setDescription] = useState();

  async function postNewItem(details) {
    return fetch('http://localhost:8080/inventory/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(details)
    })
      .then(data => data.json())
  }

  const handleNewItemSubmit = async event => {
    event.preventDefault();
    const alertMsg = await postNewItem({
      itemname,
      quantity,
      description,
      userid: credentials?.id
    });
    alert(alertMsg);
    setCreatingNewItem(false);
  }

  return (
    <div className='newItemPageContainer'>
      <div className="newItemWrapperContainer">
        <h2 className='newItemTitle'>Create a New Item</h2>
        <form className="newItemWrapper" onSubmit={handleNewItemSubmit}>
          <label>
            <p>Item Name</p>
            <input type="text" required value={itemname} onChange={e => setItemName(e.target.value)} />
          </label>
          <label>
            <p>Quantity</p>
            <input type="number" required value={quantity} onChange={e => setQuantity(e.target.value)} />
          </label>
          <label>
            <p>Description</p>
            <input type="text" required value={description} onChange={e => setDescription(e.target.value)} />
          </label>
          <div className='buttonContainer' >
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}