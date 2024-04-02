import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CheckList from './CheckList';

const Cards = ({ listId }) => {
  const [cards, setCards] = useState([]);
  const [newCardName, setNewCardName] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const apiKey = '39df2bffe3a2c03d74908a7de11350b7';
  const apiToken = 'ATTA449fb5eaa45dfd26a241747c7485458e593bbaa24987ef480af93027985976b78B7D4CE9';

  useEffect(() => {
    fetchData();
  }, [listId]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.trello.com/1/lists/${listId}/cards?key=${apiKey}&token=${apiToken}`);
      setCards(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (event, cardId) => {
    event.stopPropagation(); 
    try {
      const response = await axios.delete(`https://api.trello.com/1/cards/${cardId}?key=${apiKey}&token=${apiToken}`);
      fetchData();
      setIsAdding(false);
      console.log(`Deleted card:`, response.data);
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleInputChange = (event) => {
    setNewCardName(event.target.value);
  };

  const handleAddCard = async () => {
    if (newCardName.trim() !== '') {
      try {
        const response = await axios.post(`https://api.trello.com/1/cards?key=${apiKey}&token=${apiToken}&idList=${listId}&name=${newCardName}`);
        fetchData();
        setNewCardName('');
        setIsAdding(false);
        console.log(`New Card:`, response.data);
      } catch (error) {
        console.error('Error adding card:', error);
      }
    } else {
      setIsAdding(false);
    }
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsAdding(false);
  };

  const handleClosePopup = () => {
    setSelectedCard(null);
  };

  return (
    <div style={{
      backgroundColor: 'rgb(194 196 202)',
      padding: '10px',
      borderRadius: '5px',
      marginBottom: '10px'
    }}>
      {cards.length > 0 ? (
        cards.map(card => (
          <div key={card.id} style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '5px',
            color: 'black',
            fontSize: '16px',
            cursor:'pointer',
            background:'white',
            borderRadius:'5px'
          }} onClick={() => handleCardClick(card)}>
            <span style={{ marginLeft: '10px' }}>{card.name}</span>
            <DeleteIcon
              style={{
                marginLeft: 'auto',
                cursor: 'pointer',
                color: 'red',
                fontSize:'20px',
                padding:'5px'
              }}
              onClick={(event) => handleDelete(event, card.id)} 
            />
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
          <Button onClick={handleAddCard} variant="contained" color="primary" style={{ marginLeft: '5px' ,backgroundColor:'green'}}>Add</Button>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            color: 'white',
            background:'rgb(29,33,37)',
            borderRadius:'5px'
          }}
          onClick={handleAddClick}
        >
          <AddIcon style={{ marginLeft: '10px', color: 'green' }} />
          <span style={{ marginLeft: '5px', fontSize: '16px' }}>Add card</span>
        </div>
      )}
      {selectedCard && <CheckList card={selectedCard}  onClose={handleClosePopup} />}
    </div>
  );
};

export default Cards;