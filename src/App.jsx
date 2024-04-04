import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Boards from './components/Boards';
import BoardLists from './components/BoardsList';
import FormComponent from './components/Form'; 
import { Dialog, DialogTitle, DialogContent} from '@mui/material';
import './App.css';
import Loader from './components/Loader';
import ErrorComponent from './components/Error'; 
import SuccessComponent from './components/Success'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getAllBoards, createBoard } from './API/api';

const App = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [boardName, setBoardName] = useState('');
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Error, setError] = useState(null); 
  const [success, setSuccess] = useState(null); 

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const data = await getAllBoards();
      setBoards(data);
      setLoading(false);
      setSuccess('Boards fetched successfully.'); 
    } catch (error) {
      console.error('Error fetching boards:', error);
      setError('Error fetching boards. Please try again later.'); 
      setLoading(false); 
    }
  };

  const handleCreateBoardClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setBoardName('');
  };

  const handleCreateBoard = async (boardName) => {
    try {
      const response = await createBoard(boardName);
      console.log('New board created:', response);
      fetchBoards();
      setOpenDialog(false);
      setSuccess('Board created successfully.'); 
      setError(null); 
    } catch (error) {
      console.error('Error creating board:', error);
      setError('Error creating board. Please try again.'); 
      setSuccess(null); 
    }
  };
  
  const handleCloseError = () => {
    setError(null); 
  };

  const handleCloseSuccess = () => {
    setSuccess(null);
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
                  <Loader />
                ) : (
                  <Boards boards={boards} />
                )}

               {Error && <ErrorComponent open={!!Error} onClose={handleCloseError} message={Error} />} 
               {success && <SuccessComponent open={!!success} onClose={handleCloseSuccess} message={success} />} 
                <Dialog open={openDialog} onClose={handleCloseDialog} style={{ backgroundColor: 'transparent' }}>
                  <DialogTitle style={{ backgroundColor: 'rgb(29,30,37)', color: 'white' }}>Create a New Board</DialogTitle>
                  <DialogContent style={{ backgroundColor: 'rgb(194 196 202)'}}>
                    <FormComponent onSubmit={handleCreateBoard} onCancel={handleCloseDialog} />
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
