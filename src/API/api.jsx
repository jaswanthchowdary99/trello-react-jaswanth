import axios from 'axios';

const apiKey = import.meta.env.VITE_APP_KEY;
const apiToken = import.meta.env.VITE_APP_TOKEN;
const baseUrl = "https://api.trello.com/1/";

axios.defaults.params = {
  key: apiKey,
  token: apiToken
};

export const getAllBoards = async () => {
  try {
    const response = await axios.get(`${baseUrl}members/me/boards`);
    return response.data;
  } catch (error) {
    console.error('Error fetching boards:', error);
    throw error;
  }
};

export const createBoard = async (boardName) => {
  try {
    const response = await axios.post(`${baseUrl}boards`, { name: boardName });
    return response.data;
  } catch (error) {
    console.error('Error creating board:', error);
    throw error;
  }
};

export const getBoardById = async (boardId) => {
  try {
    const response = await axios.get(`${baseUrl}boards/${boardId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching board by ID:', error);
    throw error;
  }
};

export const getListsByBoardId = async (boardId) => {
  try {
    const response = await axios.get(`${baseUrl}boards/${boardId}/lists`);
    return response.data;
  } catch (error) {
    console.error('Error fetching lists by board ID:', error);
    throw error;
  }
};

export const createList = async (boardId, listName) => {
  try {
    const response = await axios.post(`${baseUrl}boards/${boardId}/lists`, { name: listName });
    return response.data;
  } catch (error) {
    console.error('Error creating list:', error);
    throw error;
  }
};

export const deleteList = async (listId) => {
  try {
    await axios.put(`${baseUrl}lists/${listId}/closed`, { value: true });
    console.log('List deleted:', listId);
  } catch (error) {
    console.error('Error deleting list:', error);
    throw error;
  }
};

export const getCardsByListId = async (listId) => {
  try {
    const response = await axios.get(`${baseUrl}lists/${listId}/cards`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cards:', error);
    throw error;
  }
};

export const createCard = async (listId, cardName) => {
  try {
    const response = await axios.post(`${baseUrl}lists/${listId}/cards`, { name: cardName });
    return response.data;
  } catch (error) {
    console.error('Error creating card:', error);
    throw error;
  }
};

export const deleteCard = async (cardId) => {
  try {
    await axios.delete(`${baseUrl}cards/${cardId}`);
    console.log('Card deleted:', cardId);
  } catch (error) {
    console.error('Error deleting card:', error);
    throw error;
  }
};

export const getChecklistsByCardId = async (cardId) => {
  try {
    const response = await axios.get(`${baseUrl}cards/${cardId}/checklists`);
    return response.data;
  } catch (error) {
    console.error('Error fetching checklists:', error);
    throw error;
  }
};

export const createChecklist = async (cardId, checklistName) => {
  try {
    const response = await axios.post(`${baseUrl}cards/${cardId}/checklists`, { name: checklistName });
    return response.data;
  } catch (error) {
    console.error('Error creating checklist:', error);
    throw error;
  }
};

export const deleteChecklist = async (checklistId) => {
  try {
    await axios.delete(`${baseUrl}checklists/${checklistId}`);
    console.log('Checklist deleted:', checklistId);
  } catch (error) {
    console.error('Error deleting checklist:', error);
    throw error;
  }
};

export const getChecklistDetails = async (checklistId) => {
  try {
    const response = await axios.get(`${baseUrl}checklists/${checklistId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching checklist details:', error);
    throw error;
  }
};

export const getCheckItemsForChecklist = async (checklistId) => {
  try {
    const response = await axios.get(`${baseUrl}checklists/${checklistId}/checkItems`);
    return response.data;
  } catch (error) {
    console.error('Error fetching check items:', error);
    throw error;
  }
};

export const createCheckItem = async (checklistId, checkItemName) => {
  try {
    const response = await axios.post(`${baseUrl}checklists/${checklistId}/checkItems`, { name: checkItemName });
    return response.data;
  } catch (error) {
    console.error('Error adding check item:', error);
    throw error;
  }
};

export const deleteCheckItem = async (checklistId, itemId) => {
  try {
    await axios.delete(`${baseUrl}checklists/${checklistId}/checkItems/${itemId}`);
    console.log('Check item deleted:', itemId);
  } catch (error) {
    console.error('Error deleting check item:', error);
    throw error;
  }
};

export const toggleCheckItem = async (selectCardId, checklistId, itemId, currentState) => {
  try {
    const newState = currentState === 'complete' ? 'incomplete' : 'complete';
    const response = await axios.put(`${baseUrl}cards/${selectCardId}/checklist/${checklistId}/checkItem/${itemId}`, { state: newState });
    return response.data;
  } catch (error) {
    console.error('Error toggling check item state:', error);
    throw error;
  }
};
