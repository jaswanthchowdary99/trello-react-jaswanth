import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import { useParams } from "react-router-dom";
import { Container, Box, Button, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Loader from './Loader';
import ErrorComponent from './Error';
import SuccessComponent from './Success'; 
import {getBoardById, getListsByBoardId, createList, deleteList } from '../API/api';
import FormComponent from './Form';

export default function BoardLists() {
  const { boardId } = useParams();
  const [boardData, setBoardData] = useState({ name: '', lists: [] });
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [Error, setError] = useState(null); 
  const [success, setSuccess] = useState(null); 

  useEffect(() => {
    fetchBoardData();
  }, [boardId]);

  /// fetching all the lists in selected boards
  const fetchBoardData = async () => {
    try {
      const boardResponse = await getBoardById(boardId);
      const listsResponse = await getListsByBoardId(boardId);
      const info = { name: boardResponse.name, lists: listsResponse };
      setBoardData(info);
      setLoading(false); 
      setSuccess('Lists fetched successfully.')
    } catch (error) {
      console.error('Error fetching List data:', error);
      setError('Error fetching List data. Please try again.'); 
      setLoading(false);
    }
  };

  const handleAddListClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  /// creating new lists inside the boards
  const handleCreateList = async (newListName) => {
    try {
      const response = await createList(boardId, newListName);
      console.log('New list created:', response);
      fetchBoardData();
      handleCloseDialog();
      setSuccess('Lists created successfully.')
    } catch (error) {
      console.error('Error creating list:', error);
      setError('Error creating list. Please try again.'); 
    }
  };

  /// deleting the lists
  const handleDeleteList = async (listId) => {
    try {
      await deleteList(listId);
      console.log('List deleted:', listId);
      const updatedLists = boardData.lists.filter(list => list.id !== listId);
      const deletedList = { ...boardData, lists: updatedLists };
      setBoardData(deletedList);
      setSuccess('Lists deleted successfully.')
    } catch (error) {
      console.error('Error deleting list:', error);
      setError('Error deleting list. Please try again.'); 
    }
  };

  const handleCloseSuccess = () => {
    setSuccess(null);
  };

  return (
    <div>
      <Container>
        <Box sx={{
          display: 'flex',justifyContent: 'space-between', alignItems: 'center',marginBottom: '20px',marginTop:'50px',
        }}>
          <Button href="/" style={{backgroundColor:'rgb(141,144,153)',color:'black', fontWeight: '550', fontFamily: 'Roboto, Helvetica, Arial, sans-serif'}} variant="contained">Back</Button>
               
          <div  style ={{
            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',fontWeight: '550', fontSize:'25px',padding:'5px', color: 'rgb(194 196 202)',
          }}>{boardData.name}</div>
           
          <Button style={{backgroundColor:'rgb(141,144,153)',color:'black', fontWeight: '550', fontFamily: 'Roboto, Helvetica, Arial, sans-serif'}} variant="text" onClick={handleAddListClick}><AddIcon style={{color:'white'}} /> Add New List</Button>
        </Box>
        {loading ? (
          <Loader/>
        ) : Error ? ( 
          <ErrorComponent open={!!Error} onClose={() => setError(null)} message={Error} />

        ) : (
          <>
            {boardData.lists.length === 0 ? (
              <div style={{ textAlign: 'center',fontSize:'20px',fontWeight:'550', marginTop: '150px', fontFamily: 'Roboto, Helvetica, Arial, sans-serif', color: 'rgb(194 196 202)' }}>
                No lists found.
              </div>
            ) : (
              <Box
                sx={{
                  display: 'flex',flexWrap: 'nowrap',overflowX: 'auto', WebkitOverflowScrolling: 'touch',marginBottom: '50px',height:'650px'
                }}
              >
                {boardData.lists.map(list => (
                  <Box
                    key={list.id}
                    sx={{
                      flex: '0 0 auto', marginRight: '20px'
                    }}
                  >
                    <Box
                      sx={{
                        background: 'linear-gradient(to right, rgb(92,98,104),RGB(148 154 160))',color: 'white', fontSize: '18px',marginTop: '50px', fontWeight: '550',padding: '20px',borderRadius: '8px',boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',fontFamily: 'Roboto, Helvetica, Arial, sans-serif', display: 'flex',flexDirection: 'column',justifyContent: 'space-between',height: 'auto',width:'250px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>{list.name}</div>
                        <IconButton onClick={() => handleDeleteList(list.id)}>
                          <DeleteIcon style={{color:'rgb(213 52 18)'}} />
                        </IconButton>
                      </div>
                      <Cards boardId={boardId} listId={list.id} /> 
                    </Box>
                  </Box>
                ))}
              </Box>   
            )}
          </>
        )}
      </Container>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle style={{ backgroundColor: 'rgb(29,30,37)', color: 'white' }}>Add New List</DialogTitle>
        <DialogContent style={{backgroundColor: 'rgb(194 196 202)'}} >
          <FormComponent onSubmit={handleCreateList} onCancel={handleCloseDialog} />
        </DialogContent>
      </Dialog>
      {success && <SuccessComponent open={!!success} onClose={handleCloseSuccess} message={success} />} 
    </div>
  );
};
