import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "./Cards";
import { useParams } from "react-router-dom";
import { Container, Box, Button, TextField, Dialog, DialogTitle, DialogContent, IconButton,CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';


export default function BoardLists() {
  const { boardId } = useParams();
  const [boardData, setBoardData] = useState({ name: '', lists: [] });
  const [openDialog, setOpenDialog] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [loading, setLoading] = useState(true);
  const apiKey = import.meta.env.VITE_APP_KEY;
  const apiToken = import.meta.env.VITE_APP_TOKEN;
  useEffect(() => {
    fetchBoardData();
  }, [boardId]);

  const fetchBoardData = async () => {
    try {
      const boardResponse = await axios.get(`https://api.trello.com/1/boards/${boardId}?key=${apiKey}&token=${apiToken}`);
      const listsResponse = await axios.get(`https://api.trello.com/1/boards/${boardId}/lists?key=${apiKey}&token=${apiToken}`);
      const info = { name: boardResponse.data.name, lists: listsResponse.data };
      setBoardData(info);
      setLoading(false); 
      console.log(info);
    } catch (error) {
      console.error('Error fetching board data:', error);
    }
  };

  const handleAddListClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewListName('');
  };

  const handleNewListNameChange = (event) => {
    setNewListName(event.target.value);
  };

  const handleCreateList = async (event) => {
    event.preventDefault(); 
    try {
      const response = await axios.post(`https://api.trello.com/1/lists?key=${apiKey}&token=${apiToken}`, {
        name: newListName,
        idBoard: boardId
      });
      console.log('New list created:', response.data);
      fetchBoardData();
      handleCloseDialog();
    } catch (error) {
      console.error('Error creating list:', error);
    }
  };

  const handleDeleteList = async (listId) => {
    try {
      await axios.put(`https://api.trello.com/1/lists/${listId}/closed?key=${apiKey}&token=${apiToken}&value=true`);
      console.log('List deleted:', listId);
      const updatedLists = boardData.lists.filter(list => list.id !== listId);
      setBoardData({ ...boardData, lists: updatedLists });
    } catch (error) {
      console.error('Error deleting list:', error);
    }
  };
  
  return (
    <div>
    <Container>
      
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        marginTop:'50px',
      }}>
        <Button href="/" style={{backgroundColor:'rgb(141,144,153)',color:'black', fontWeight: '550', fontFamily: 'Roboto, Helvetica, Arial, sans-serif'}} variant="contained">Back</Button>
             
         <div  style ={{
              fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
              fontWeight: '550',
              fontSize:'25px',
              padding:'5px',
              color: 'rgb(194 196 202)',
              }}>{boardData.name}</div>
         
        <Button style={{backgroundColor:'rgb(141,144,153)',color:'black', fontWeight: '550', fontFamily: 'Roboto, Helvetica, Arial, sans-serif'}} variant="text" onClick={handleAddListClick}><AddIcon style={{color:'white'}} /> Add New List</Button>
        
      </Box>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
          <CircularProgress />
        </div>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'nowrap',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            marginBottom: '50px',
            height:'650px'
          }}
        >
          {boardData.lists.map(list => (
            <Box
              key={list.id}
              sx={{
                flex: '0 0 auto',
                marginRight: '20px'
              }}
            >
              <Box
                sx={{
                  background: 'linear-gradient(to right, rgb(92,98,104),RGB(148 154 160))',
                  color: 'white',
                  fontSize: '18px',
                  marginTop: '50px',
                  fontWeight: '550',
                  padding: '20px',
                  borderRadius: '8px',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                  fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: 'auto',
                  width:'250px'
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
      
    </Container>
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle style={{ backgroundColor: 'rgb(29,30,37)', color: 'white' }}>Add New List</DialogTitle>
      <DialogContent style={{backgroundColor: 'rgb(194 196 202)'}} >
        <form onSubmit={handleCreateList}>
          <TextField
            autoFocus
            margin="dense"
            label="List Name"
            type="text"
            fullWidth
            value={newListName}
            onChange={handleNewListNameChange}
            style={{backgroundColor:'white',borderRadius:'5px'}}
          />
          <Button style={{ color:'red'}} onClick={handleCloseDialog}>Cancel</Button>
          <Button type="submit" style={{ color:'darkGreen'}}>Create List</Button>
        </form>
      </DialogContent>
    </Dialog>
    </div>
  );
};
