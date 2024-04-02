import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Boards from './components/Boards';
import BoardLists from './components/BoardsList';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, TextField, Button, CircularProgress } from '@mui/material';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [boardName, setBoardName] = useState('');
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = '39df2bffe3a2c03d74908a7de11350b7';
  const apiToken = 'ATTA449fb5eaa45dfd26a241747c7485458e593bbaa24987ef480af93027985976b78B7D4CE9';

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const response = await axios.get(`https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${apiToken}`);
      setBoards(response.data);
      setLoading(false); 
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching boards:', error);
    }
  };

  const handleCreateBoardClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setBoardName('');
  };

  const handleCreateBoard = async (event) => {
    event.preventDefault(); 
    try {
      const response = await axios.post(`https://api.trello.com/1/boards?key=${apiKey}&token=${apiToken}`, {
        name: boardName
      });
      console.log('New board created:', response.data);
      fetchBoards();
      setOpenDialog(false);
      setBoardName('');
    } catch (error) {
      console.error('Error creating board:', error);
    }
  };

  const handleBoardNameChange = (event) => {
    setBoardName(event.target.value);
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header handleCreateBoardClick={handleCreateBoardClick} />
                {loading ? (
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
                    <CircularProgress />
                  </div>
                ) : (
                  <Boards boards={boards} />
                )}
                <Dialog open={openDialog} onClose={handleCloseDialog} style={{ backgroundColor: 'transparent' }}>
                  <DialogTitle style={{ backgroundColor: 'rgb(29,30,37)', color: 'white' }}>Create a New Board</DialogTitle>
                  <DialogContent style={{backgroundColor: 'rgb(194 196 202)'}}>
                    <form onSubmit={handleCreateBoard}>
                      <TextField
                        autoFocus
                        margin="dense"
                        label="Board Name"
                        type="text"
                        fullWidth
                        value={boardName}
                        onChange={handleBoardNameChange}
                        style={{background:'white',borderRadius:'5px',marginTop:'15px'}}
                      />
                      <Button style={{ color:'red',backgroundColor: 'rgb(194 196 202)',borderRadius:'0'}} onClick={handleCloseDialog}>Cancel</Button>
                      <Button type="submit" style={{ color:'darkGreen',backgroundColor: 'rgb(194 196 202)',borderRadius:'0'}}>Create</Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </>
            }
          />
          <Route path="/boards/:boardId" element={<BoardLists />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
