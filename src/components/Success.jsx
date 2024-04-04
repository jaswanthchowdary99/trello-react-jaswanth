import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const SuccessComponent = ({ open, onClose, message }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity="success" sx={{ width: '100%' , marginLeft:'470px'}}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SuccessComponent;
