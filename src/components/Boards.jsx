import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box } from '@mui/material';
import ErrorComponent from './Error';
import Header from './Header';
import FormComponent from './Form';
import Loader from './Loader';
import SuccessComponent from './Success';
import { Dialog, DialogTitle, DialogContent} from '@mui/material';
import { getAllBoards, createBoard } from '../API/api';

const Boards = () => {
  const [openDialog, setOpenDialog] = useState(false);
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

  if (!boards || boards.length === 0) {
    return <ErrorComponent message="No boards found." />;
  }

  return (
    <Container>
      <Header handleCreateBoardClick={handleCreateBoardClick} />
      {loading ? (
        <Loader />
      ) : (
        <Grid container spacing={2}>
          {boards.map(data => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={data.id}>
              <Link to={`/boards/${data.id}`} style={{ textDecoration: 'none' }}>
                <Box
                  sx={{
                    background: 'linear-gradient(to right, rgb(75,59,142), rgb(117,61,138))',color: 'white',fontSize: '18px', marginTop:'50px', fontWeight: '550', padding: '20px',borderRadius: '8px',boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', textAlign: 'left',display: 'flex',flexDirection: 'column',  alignItems: 'flex-start',justifyContent: 'flex-start',height: '100px',fontFamily: 'Roboto, Helvetica, Arial, sans-serif',cursor:'pointer', textDecoration: 'none',
                  }}
                >
                  {data.name}
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
      <Dialog open={openDialog} onClose={handleCloseDialog} style={{ backgroundColor: 'transparent' }}>
        <DialogTitle style={{ backgroundColor: 'rgb(29,30,37)', color: 'white' }}>Create a New Board</DialogTitle>
        <DialogContent style={{ backgroundColor: 'rgb(194 196 202)'}}>
          <FormComponent onSubmit={handleCreateBoard} onCancel={handleCloseDialog} />
        </DialogContent>
      </Dialog>
      {Error && <ErrorComponent open={!!Error} onClose={handleCloseError} message={Error} />} 
      {success && <SuccessComponent open={!!success} onClose={handleCloseSuccess} message={success} />} 
    </Container>
  );
};

export default Boards;
