import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {Button,TextField} from '@mui/material';
import CheckList from './CheckList';
import { getCardsByListId, createCard, deleteCard } from '../API/api';
import ErrorComponent from './Error'; 
import SuccessComponent from './Success'; 

const Cards = ({ listId }) => {
  const [cards, setCards] = useState([]);
  const [newCardName, setNewCardName] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [Error, setError] = useState(null); 
  const [success, setSuccess] = useState(null); 
  const [hoveredCard, setHoveredCard] = useState(null); 


  useEffect(() => {
    fetchCardsData();
  }, [listId]);



 /// fetching the cards info  in lists 
  const fetchCardsData = async () => {
    try {
      const data = await getCardsByListId(listId);
      setCards(data);
      setError(null); 
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching card data. Please try again.'); 
    }
  };


  /// deleting the cards 
  const handleDeleteCard = async (event, cardId) => {
    event.stopPropagation();
    try {
      await deleteCard(cardId);
      fetchCardsData();
      setIsAdding(false);
      setSuccess('Card deleted successfully.')
      console.log(`Deleted card:`, cardId);
    } catch (error) {
      console.error('Error deleting card:', error);
      setError('Error deleting card. Please try again.'); 
    }
  };

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleInputChange = (event) => {
    setNewCardName(event.target.value);
  };
  
  /// creating new cards
  const handleAddCard = async () => {
    if (newCardName.trim() !== '') {
      try {
        await createCard(listId, newCardName);
        fetchCardsData();
        setNewCardName('');
        setIsAdding(false);
        setSuccess('Card created successfully.')
        console.log(`New card created`);
      } catch (error) {
        console.error('Error adding card:', error);
        setError('Error adding card. Please try again.'); 
      }
    } 
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsAdding(false);
  };

  const handleClosePopup = () => {
    setSelectedCard(null);
  };

  const handleCloseSuccess = () => {
    setSuccess(null);
  };

  const closeCard = () => {
    setIsAdding(false);
  }

  return (
    <div style={{
      backgroundColor: 'rgb(194 196 202)', padding: '10px',borderRadius: '5px',marginBottom: '10px'
    }}>
      <ErrorComponent open={!!Error} onClose={() => setError(null)} message={Error} />
      {cards.length > 0 ? (
        cards.map(card => (
          <div key={card.id} style={{
            display: 'flex',alignItems: 'center',padding:'4px', marginBottom: '5px',color: 'black',fontSize: '17px', cursor:'pointer', background:'white',borderRadius:'5px'
          }} onClick={() => handleCardClick(card)}
          onMouseEnter={() => setHoveredCard(card.id)}
          onMouseLeave={() => setHoveredCard(null)}
          >
            <span style={{ marginLeft: '10px' }}>{card.name}</span>
            {hoveredCard === card.id && (
            <DeleteIcon
              style={{
                marginLeft: 'auto',cursor: 'pointer',color: 'red',fontSize:'20px',padding:'5px'
              }}
              onClick={(event) => handleDeleteCard(event, card.id)} 
            />
            )}
          </div>
        ))
      ) : (
        <p style={{fontSize:'12px',color:'black',margin:'10px'}}>No Cards Available</p>
      )}
      {isAdding ? (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
          <TextField
            size="small"
            value={newCardName}
            onChange={handleInputChange}
            placeholder="Enter new card"
            style={{ margin: '1px', padding: '2px', borderRadius: "5px", borderColor: 'rgb(194 196 202)' }}
          />
          <Button onClick={handleAddCard} variant="contained" color="primary" style={{ marginLeft: '5px' ,backgroundColor:'green',fontWeight:'600',color:'black'}}>Add</Button>
          <Button onClick={closeCard} variant="contained" color="primary" style={{ marginLeft: '5px' ,backgroundColor:'red',fontWeight:'600',color:'black'}}>X</Button>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',alignItems: 'center', cursor: 'pointer',color: 'white',background:'rgb(29,33,37)',borderRadius:'5px'
          }}
          onClick={handleAddClick}
        >
          <AddIcon style={{ marginLeft: '10px', color: 'green' }} />
          <span style={{ marginLeft: '5px', fontSize: '16px' }}>Add card</span>
        </div>
      )}
      {selectedCard && <CheckList card={selectedCard}  onClose={handleClosePopup} />}
      {success && <SuccessComponent open={!!success} onClose={handleCloseSuccess} message={success} />} 
    </div>
  );
};

export default Cards;
