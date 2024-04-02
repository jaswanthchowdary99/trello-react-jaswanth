import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCard';
import CheckItems from './CheckItems'; 

const CheckList = ({ card, onClose }) => {
  const [checklists, setChecklists] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newCheckListName, setNewCheckListName] = useState('');
  const apiKey = '39df2bffe3a2c03d74908a7de11350b7';
  const apiToken = 'ATTA449fb5eaa45dfd26a241747c7485458e593bbaa24987ef480af93027985976b78B7D4CE9';

  useEffect(() => {
    if (card.id) {
      fetchChecklists();
    }
  }, [card.id]);

  const fetchChecklists = async () => {
    try {
      const response = await axios.get(`https://api.trello.com/1/cards/${card.id}/checklists?key=${apiKey}&token=${apiToken}`);
      setChecklists(response.data);
    } catch (error) {
      console.error('Error fetching checklists:', error);
    }
  };

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleInputChange = (event) => {
    setNewCheckListName(event.target.value);
  };

  const addCheckList = async (event) => {
    event.preventDefault(); 
    try {
      const response = await axios.post(`https://api.trello.com/1/cards/${card.id}/checklists?key=${apiKey}&token=${apiToken}&name=${newCheckListName}`);
      if (response.status === 200) {
        fetchChecklists();
        setIsAdding(false);
        setNewCheckListName('');
      }
    } catch (error) {
      console.error('Error adding checklist:', error);
    }
  };

  const deleteCheckList = async (checklistId) => {
    try {
      const response = await axios.delete(`https://api.trello.com/1/checklists/${checklistId}?key=${apiKey}&token=${apiToken}`);
      if (response.status === 200) {
        setIsAdding(false);
        fetchChecklists();
      }
    } catch (error) {
      console.error('Error deleting checklist:', error);
    }
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle style={{ backgroundColor: 'rgb(29,30,37)', color: 'white', fontWeight: '550',display:'flex',alignItems:'center' }}><CreditCardOutlinedIcon size='small' style={{marginRight:'10px'}} />{card.name}</DialogTitle>
      <DialogContent style={{ backgroundColor: 'rgb(194 196 202)', padding: '10px' }}>
        {checklists.length > 0 ? (
          checklists.map(checklist => (
            <div style={{ display: 'flex' ,fontFamily: 'Roboto, Helvetica, Arial, sans-serif',marginTop:'15px',background:'rgb(29,30,37)',padding:' 5px',borderRadius:'5px',color:'white',width:'auto'}} key={checklist.id}>
              <CheckItems selectCardId={card.id} checklistId={checklist.id} />
              <div style={{ marginLeft: 'auto' }}>
                <Button style={{color:'red',fontWeight:'550',background:'transparent'}} variant="contained" onClick={() => deleteCheckList(checklist.id)} color="secondary">
                  Delete
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p style={{
            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
            fontWeight:'550',
            margin:'10px'
          }}>No Checklists Available</p>
        )}
        {isAdding && (
          <form onSubmit={addCheckList}>
            <TextField
              autoFocus
              margin="dense"
              size="small"
              id="newCheckListName"
              label="New Checklist Name"
              type="text"
              fullWidth
              value={newCheckListName}
              onChange={handleInputChange}
            />
            <Button type="submit" color="primary"
            style={{
              fontWeight: '550 ',
              backgroundColor: 'rgb(29,30,37)', color: 'white', fontWeight: '600', fontSize: '10px',
              padding: '5px'
            }} >
              Add Checklist
            </Button>
          </form>
        )}
      </DialogContent>
      <DialogActions style={{ backgroundColor: 'rgb(194 196 202)', padding: '5px', backgroundColor: 'rgb(29,30,37)' }} >
        {!isAdding && (
          <Button onClick={handleAddClick} color="primary" style={{ fontWeight: '550', color: 'green' }}>
            <AddIcon style={{ color: 'white' }} />
            Add Checklist
          </Button>
        )}
        <Button onClick={onClose} color="primary" style={{ color: 'red', fontWeight: '550' }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CheckList;
