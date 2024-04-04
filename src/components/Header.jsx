import React from 'react';
import { AppBar, Toolbar, Typography, Container, Button} from '@mui/material';

const Header = ({ handleCreateBoardClick }) => {
  return (
    <AppBar position="static"  style={{ backgroundColor: 'rgb(141,144,152)' }}>
      <Container>
        <Toolbar>
          <Button variant="contained" onClick={handleCreateBoardClick} style={{ backgroundColor: 'rgb(29,33,37)', color:'white',fontWeight:'600'}}>Create Board</Button>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center',fontSize:'25px' }}>
          <img
              src='https://trello.com/assets/d947df93bc055849898e.gif'
              alt="Trello Logo"
              style={{ width: '120px', verticalAlign: 'middle', marginRight: '5px' }}
            />
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
