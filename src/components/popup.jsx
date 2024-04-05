import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const ChecklistForm = ({ onSubmit, onCancel, placeholder }) => {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(value);
    setValue('');
  };

  const handleCancel = () => {
    onCancel();
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        autoFocus
        margin="dense"
        size="small"
        label={placeholder}
        type="text"
        fullWidth
        value={value}
        onChange={handleChange}
      />
      <div style={{ display: 'flex', margin: '5px' }}>
        <Button type="submit" color="primary" style={{
          backgroundColor: 'rgb(194 196 202)', marginLeft: '50px', color: 'black', fontWeight: '600', fontSize: '10px', padding: '5px'
        }}>
          Add Item
        </Button>
        <Button onClick={handleCancel} color="secondary" variant="contained" style={{ fontWeight: '600', fontSize: '10px', padding: '5px', marginLeft: '5px', backgroundColor: 'red', color: 'black' }}>
          Close
        </Button>
      </div>
    </form>
  );
};

export default ChecklistForm;