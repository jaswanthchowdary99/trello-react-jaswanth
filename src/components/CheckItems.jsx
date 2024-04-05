import React, { useState, useEffect } from 'react';
import { LinearProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import { getChecklistDetails, getCheckItemsForChecklist, createCheckItem, deleteCheckItem, toggleCheckItem } from '../API/api';
import Loader from './Loader';
import ErrorComponent from './Error';
import SuccessComponent from './Success';
import ChecklistForm from './popup'; 
import { Button } from '@mui/material';

const CheckItems = ({ checklistId, selectCardId }) => {
  const [checkItems, setCheckItems] = useState([]);
  const [checklistName, setChecklistName] = useState('');
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [Error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isAddingItem, setIsAddingItem] = useState(false);

  useEffect(() => {
    fetchChecklistDetails();
    fetchCheckItems();
  }, [checklistId]);

  useEffect(() => {
    updateProgress();
  }, [checkItems]);

  const fetchChecklistDetails = async () => {
    try {
      const checklist = await getChecklistDetails(checklistId);
      setChecklistName(checklist.name);
      setError(null);
    } catch (error) {
      console.error('Error fetching checklist details:', error);
      setError('Error fetching checklist details. Please try again.');
    }
  };

  const fetchCheckItems = async () => {
    try {
      setLoading(true);
      const items = await getCheckItemsForChecklist(checklistId);
      setCheckItems(items);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error('Error fetching check items:', error);
      setError('Error fetching check items. Please try again.');
    }
  };

  const handleAddCheckItem = async (newCheckItemName) => {
    if (newCheckItemName.trim() !== '') {
      try {
        const items = await createCheckItem(checklistId, newCheckItemName);
        fetchCheckItems();
        setSuccess('CheckItem created successfully.');
      } catch (error) {
        console.error('Error adding check item:', error);
        setError('Error adding check item. Please try again.');
      }
    }
  };

  const handleDeleteCheckItem = async (itemId) => {
    try {
      const items = await deleteCheckItem(checklistId, itemId);
      fetchCheckItems();
      console.log(`Deleted CheckItem:`, items);
      setSuccess('CheckItem deleted successfully.');
    } catch (error) {
      console.error('Error deleting check item:', error);
      setError('Error deleting check item. Please try again.');
    }
  };

  const handleToggleCheckItem = async (itemId, currentState) => {
    try {
      const toggle = await toggleCheckItem(selectCardId, checklistId, itemId, currentState);
      fetchCheckItems();
      console.log(`Toggled item`, toggle);
      setSuccess('CheckItem toggled successfully.');
    } catch (error) {
      console.error('Error toggling check item state:', error);
      setError('Error toggling check item state. Please try again.');
    }
  };

  const handleAddItemClick = () => {
    setIsAddingItem(true);
  };

  const updateProgress = () => {
    const completedItems = checkItems.filter((item) => item.state === 'complete').length;
    const totalItems = checkItems.length;
    const newProgress = Math.floor((completedItems / totalItems) * 100) || 0;
    setProgress(newProgress);
  };

  const handleCloseSuccess = () => {
    setSuccess(null);
  };

  return (
    <div>
      <h3 style={{ display: 'flex', margin: '5px', alignItems: 'center' }}>
        <DomainVerificationIcon size='small' style={{ marginRight: '5px' }} /> {checklistName}
      </h3>
      <ErrorComponent open={!!Error} onClose={() => setError(null)} message={Error} />
      <SuccessComponent open={!!success} onClose={handleCloseSuccess} message={success} />
      {loading ? (
        <Loader />
      ) : (
        <>
          {checkItems.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '40px' }}>
              <LinearProgress style={{ width: '100%', marginRight: '10px' }} variant="determinate" value={progress} />
              <span>{`${progress}%`}</span>
            </div>
          )}

          {checkItems.length > 0 ? (
            <ul style={{ padding: 0 }}>
              {checkItems.map((item) => (
                <li
                  key={item.id}
                  style={{
                    fontFamily: 'Roboto, Helvetica, Arial, sans-serif', color: 'black',listStyle: 'none', fontWeight: '550',background: 'white',borderRadius: '5px', padding: ' 5px',display: 'flex', alignItems: 'center',justifyContent: 'space-between', width: '400px',marginLeft: '40px', marginBottom: '15px',marginTop: '20px',
                  }}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div>
                    <input
                      type="checkbox"
                      checked={item.state === 'complete'}
                      onChange={() => handleToggleCheckItem(item.id, item.state)}
                    />
                    <label style={{ margin: '15px', textDecoration: item.state === 'complete' ? 'line-through' : 'none' }}>
                      {item.name}
                    </label>
                  </div>
                  {hoveredItem === item.id && (
                    <DeleteIcon
                      style={{ cursor: 'pointer', color: 'red', fontSize: '20px' }}
                      onClick={() => handleDeleteCheckItem(item.id)}
                    />
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ margin: '20px', fontSize: '14px' }}>No Items Available</p>
          )}

          {isAddingItem ? (
            <ChecklistForm
              onSubmit={handleAddCheckItem}
              onCancel={() => setIsAddingItem(false)}
              placeholder="Enter Check Item"
            />
          ) : (
            <Button onClick={handleAddItemClick} color="primary" style={{
              fontWeight: '600', backgroundColor: 'rgb(194 196 202)', color: 'black', fontSize: '10px', padding: '5px', margin: '10px'
            }}>
              Add Item
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default CheckItems;