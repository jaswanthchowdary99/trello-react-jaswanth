import React, { useState, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box } from '@mui/material';
import ErrorComponent from './Error';
import Header from './Header';
import FormComponent from './Form';
import Loader from './Loader';
import SuccessComponent from './Success';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { getAllBoards, createBoard } from '../API/api';
import { BOARD_ACTIONS, boardReducer } from '../Hooks/useReducer'; 

const Boards = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [state, dispatch] = useReducer(boardReducer, {
    loading: true,
    boards: [],
    error: null,
    success: null,
  });

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const data = await getAllBoards();
      dispatch({ type: BOARD_ACTIONS.FETCH_BOARDS_SUCCESS, payload: data });
    } catch (error) {
      console.error('Error fetching boards:', error);
      dispatch({ type: BOARD_ACTIONS.FETCH_BOARDS_ERROR });
    }
  };

  const handleCreateBoard = async (boardName) => {
    try {
      const response = await createBoard(boardName);
      console.log('New board created:', response);
      fetchBoards();
      setOpenDialog(false);
      dispatch({ type: BOARD_ACTIONS.CREATE_BOARD_SUCCESS });
    } catch (error) {
      console.error('Error creating board:', error);
      dispatch({ type: BOARD_ACTIONS.CREATE_BOARD_ERROR });
    }
  };

  const handleCloseError = () => {
    dispatch({ type: BOARD_ACTIONS.RESET_ERROR });
  };

  const handleCloseSuccess = () => {
    dispatch({ type: BOARD_ACTIONS.RESET_SUCCESS });
  };

  if (!state.boards || state.boards.length === 0) {
    return <ErrorComponent message="No boards found." />;
  }

  return (
    <Container>
      <Header handleCreateBoardClick={() => setOpenDialog(true)} />
      {state.loading ? (
        <Loader />
      ) : (
        <Grid container spacing={2}>
          {state.boards.map((data) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={data.id}>
              <Link to={`/boards/${data.id}`} style={{ textDecoration: 'none' }}>
                <Box
                  sx={{
                    background: 'linear-gradient(to right, rgb(75,59,142), rgb(117,61,138))',
                    color: 'white',
                    fontSize: '18px',
                    marginTop: '50px',
                    fontWeight: '550',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    textAlign: 'left',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    height: '100px',
                    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                    cursor: 'pointer',
                    textDecoration: 'none',
                  }}
                >
                  {data.name}
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} style={{ backgroundColor: 'transparent' }}>
        <DialogTitle style={{ backgroundColor: 'rgb(29,30,37)', color: 'white' }}>Create a New Board</DialogTitle>
        <DialogContent style={{ backgroundColor: 'rgb(194 196 202)' }}>
          <FormComponent onSubmit={handleCreateBoard} onCancel={() => setOpenDialog(false)} />
        </DialogContent>
      </Dialog>
      {state.error && <ErrorComponent open={true} onClose={handleCloseError} message={state.error} />}
      {state.success && <SuccessComponent open={true} onClose={handleCloseSuccess} message={state.success} />}
    </Container>
  );
};

export default Boards;
