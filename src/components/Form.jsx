import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const FormComponent = ({ onSubmit, onCancel }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(inputValue); 
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        autoFocus
        margin="dense"
        label="Enter Name"
        type="text"
        fullWidth
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ background: 'white', borderRadius: '5px', marginTop: '15px' }}
      />
      <Button style={{ color: 'red', backgroundColor: 'rgb(194 196 202)', borderRadius: '0' }} onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit" style={{ color: 'darkGreen', backgroundColor: 'rgb(194 196 202)', borderRadius: '0' }}>
        Create
      </Button>
    </form>
  );
};

export default FormComponent;
