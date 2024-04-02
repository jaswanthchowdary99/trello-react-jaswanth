import React, { useState, useEffect } from 'react';
import { TextField, Button, LinearProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import axios from 'axios';

const CheckItems = ({ checklistId, selectCardId }) => {
  const [checkItems, setCheckItems] = useState([]);
  const [newCheckItemName, setNewCheckItemName] = useState('');
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [checklistName, setChecklistName] = useState('');
  const apiKey = import.meta.env.VITE_APP_KEY;
  const apiToken = import.meta.env.VITE_APP_TOKEN;
  
  useEffect(() => {
    fetchChecklistDetails();
    fetchCheckItems();
  }, [checklistId]);

  const fetchChecklistDetails = async () => {
    try {
      const response = await axios.get(`https://api.trello.com/1/checklists/${checklistId}?key=${apiKey}&token=${apiToken}`);
      setChecklistName(response.data.name);
    } catch (error) {
      console.error('Error fetching checklist details:', error);
    }
  };

  const fetchCheckItems = async () => {
    try {
      const response = await axios.get(`https://api.trello.com/1/checklists/${checklistId}/checkItems?key=${apiKey}&token=${apiToken}`);
      setCheckItems(response.data);
    } catch (error) {
      console.error('Error fetching check items:', error);
    }
  };

  const handleAddCheckItem = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`https://api.trello.com/1/checklists/${checklistId}/checkItems?key=${apiKey}&token=${apiToken}&name=${newCheckItemName}`);
      if (response.status === 200) {
        fetchCheckItems();
        setNewCheckItemName('');
        setIsAddingItem(false);
      }
    } catch (error) {
      console.error('Error adding check item:', error);
    }
  };

  const deleteCheckItem = async (itemId) => {
    try {
      const response = await axios.delete(`https://api.trello.com/1/checklists/${checklistId}/checkItems/${itemId}?key=${apiKey}&token=${apiToken}`);
      if (response.status === 200) {
        fetchCheckItems();
      }
    } catch (error) {
      console.error('Error deleting check item:', error);
    }
  };

  const toggleCheckItem = async (itemId, currentState) => {
    try {
      const newState = currentState === 'complete' ? 'incomplete' : 'complete';
      const response = await axios.put(`https://api.trello.com/1/cards/${selectCardId}/checklist/${checklistId}/checkItem/${itemId}?key=${apiKey}&token=${apiToken}&state=${newState}`);
      console.log("Toggle check item response:", response);
      if (response.status === 200) {
        fetchCheckItems();
      }
    } catch (error) {
      console.error('Error toggling check item state:', error);
    }
  };
  
  const handleAddItemClick = () => {
    setIsAddingItem(true);
  };

  return (
    <div>
      <h3 style={{display:'flex',margin:'5px',alignItems:'center' }}>
        <DomainVerificationIcon size='small'  style={{ marginRight: '5px' }} /> {checklistName}
      </h3>
      {checkItems.length > 0 ? (
        <ul style={{ padding: 0 }}>
          {checkItems.map(item => (
            <li key={item.id} style={{ fontFamily: 'Roboto, Helvetica, Arial, sans-serif', color: 'black', listStyle: 'none', fontWeight: '550', background: 'white', borderRadius: '5px', padding: ' 5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '400px', marginLeft: '40px',marginBottom:"15px",marginTop:'20px' }}>
              <div>
                <input
                  type="checkbox"
                  checked={item.state === 'complete'}
                  onChange={() => toggleCheckItem(item.id, item.state)}
                />
                <label style={{ margin: '150px', textDecoration: item.state === 'complete' ? 'line-through' : 'none' }}>{item.name}</label>
              </div>
              <DeleteIcon style={{ cursor: 'pointer', color: 'red', fontSize: '20px' }} onClick={() => deleteCheckItem(item.id)} />
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ margin: '20px', fontSize: '14px' }}>No Items Available</p>
      )}

      {isAddingItem ? (
        <form onSubmit={handleAddCheckItem}>
          <TextField
            autoFocus
            margin="dense"
            size="small"
            label="Enter Check Item"
            type="text"
            fullWidth
            value={newCheckItemName}
            onChange={(event) => setNewCheckItemName(event.target.value)}
          />
          <Button type="submit" color="primary" style={{
            backgroundColor: 'rgb(194 196 202)', color: 'black', fontWeight: '600', fontSize: '10px',
            padding: '5px'
          }}>
            Add Item
          </Button>
        </form>
      ) : (
        <Button onClick={handleAddItemClick} color="primary" style={{
          fontWeight: '600',
          backgroundColor: 'rgb(194 196 202)',
          color: 'black',
          fontSize: '10px',
          padding: '5px',
          margin: '10px'
        }}>
          Add Item
        </Button>
      )}   
    </div>
  );
};

export default CheckItems;
