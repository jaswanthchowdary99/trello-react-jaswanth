import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCard';
import CheckItems from './CheckItems'; 
import { getChecklistsByCardId, createChecklist, deleteChecklist } from '../API/api'; 
import Loader from './Loader'; 
import ErrorComponent from './Error';
import SuccessComponent from './Success'; 

const CheckList = ({ card, onClose }) => {
  const [checklists, setChecklists] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newCheckListName, setNewCheckListName] = useState('');
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); 

  useEffect(() => {
    if (card.id) {
      fetchChecklists();
    }
  }, [card.id]);

  const fetchChecklists = async () => {
    try {
      setLoading(true); 
      const data = await getChecklistsByCardId(card.id);
      setChecklists(data);
      setLoading(false); 
      setError(null); 
    } catch (error) {
      console.error('Error fetching checklists:', error);
      setError('Error fetching checklists. Please try again.'); 
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
    if (newCheckListName.trim() !== ''){
    try {
      setLoading(true);
      const response = await createChecklist(card.id, newCheckListName);
      if (response) {
        fetchChecklists();
        setIsAdding(false);
        setSuccess('Checklist created successfully.'); 
        setNewCheckListName('');
      }
    } catch (error) {
      console.error('Error adding checklist:', error);
      setError('Error adding checklist. Please try again.');
    }
  }
  };

  const deleteCheckList = async (checklistId) => {
    try {
      setLoading(true); 
      await deleteChecklist(checklistId);
      setIsAdding(false);
      fetchChecklists();
      setSuccess('Checklist deleted successfully.'); 
    } catch (error) {
      console.error('Error deleting checklist:', error);
      setError('Error deleting checklist. Please try again.'); 
    }
  };

  const handleCloseError = () => {
    setError(null); 
  };

  const handleCloseSuccess = () => {
    setSuccess(null);
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle style={{ backgroundColor: 'rgb(29,30,37)', color: 'white', fontWeight: '550',display:'flex',alignItems:'center' }}><CreditCardOutlinedIcon size='small' style={{marginRight:'10px'}} />{card.name}</DialogTitle>
      <DialogContent style={{ backgroundColor: 'rgb(194 196 202)', padding: '10px' }}>
        <ErrorComponent open={!!error} onClose={handleCloseError} message={error} />
        {loading ? ( 
          <Loader  />
        ) : (
          <>
        <SuccessComponent open={!!success} onClose={handleCloseSuccess} message={success} /> 
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
                fontFamily: 'Roboto, Helvetica, Arial, sans-serif',fontWeight:'550',margin:'10px'
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
                  backgroundColor: 'rgb(29,30,37)', color: 'white', fontWeight: '600', fontSize: '10px',
                  padding: '5px'
                }} >
                  Add Checklist
                </Button>
                <Button onClick={() => setIsAdding(false)} color="secondary" variant="contained" style={{ fontWeight: '600', fontSize: '10px', padding: '5px', marginLeft: '5px',backgroundColor:'red',color:'black' }}>
                  Close
                </Button>
              </form>
            )}
          </>
        )}
      </DialogContent>
      <DialogActions style={{ backgroundColor: 'rgb(194 196 202)', padding: '5px' }} >
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
