import axios from 'axios';
export const apiKey = import.meta.env.VITE_APP_KEY;
export const apiToken = import.meta.env.VITE_APP_TOKEN;

export const getAllBoards = async () => {
  try {
    const response = await axios.get(
      `https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${apiToken}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching boards:', error);
    throw error;
  }
};

export const createBoard = async (boardName) => {
  try {
    const response = await axios.post(
      `https://api.trello.com/1/boards?key=${apiKey}&token=${apiToken}`,
      { name: boardName }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating board:', error);
    throw error;
  }
};

export const getBoardById = async (boardId) => {
  try {
    const response = await axios.get(
      `https://api.trello.com/1/boards/${boardId}?key=${apiKey}&token=${apiToken}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching board by ID:', error);
    throw error;
  }
};

export const getListsByBoardId = async (boardId) => {
  try {
    const response = await axios.get(
      `https://api.trello.com/1/boards/${boardId}/lists?key=${apiKey}&token=${apiToken}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching lists by board ID:', error);
    throw error;
  }
};

export const createList = async (boardId, listName) => {
  try {
    const response = await axios.post(
      `https://api.trello.com/1/lists?key=${apiKey}&token=${apiToken}`,
      { name: listName, idBoard: boardId }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating list:', error);
    throw error;
  }
};

export const deleteList = async (listId) => {
  try {
    await axios.put(
      `https://api.trello.com/1/lists/${listId}/closed?key=${apiKey}&token=${apiToken}&value=true`
    );
    console.log('List deleted:', listId);
  } catch (error) {
    console.error('Error deleting list:', error);
    throw error;
  }
};

export const getCardsByListId = async (listId) => {
    try {
      const response = await axios.get(`https://api.trello.com/1/lists/${listId}/cards?key=${apiKey}&token=${apiToken}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching cards:', error);
      throw error;
    }
  };
  
 
  export const createCard = async (listId, cardName) => {
    try {
      const response = await axios.post(`https://api.trello.com/1/cards?key=${apiKey}&token=${apiToken}&idList=${listId}&name=${cardName}`);
      return response.data;
    } catch (error) {
      console.error('Error creating card:', error);
      throw error;
    }
  };
 
  export const deleteCard = async (cardId) => {
    try {
      const response = await axios.delete(`https://api.trello.com/1/cards/${cardId}?key=${apiKey}&token=${apiToken}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting card:', error);
      throw error;
    }
  };



export const getChecklistsByCardId = async (cardId) => {
    try {
      const response = await axios.get(`https://api.trello.com/1/cards/${cardId}/checklists?key=${apiKey}&token=${apiToken}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching checklists:', error);
      throw error;
    }
  };
  
  export const createChecklist = async (cardId, checklistName) => {
    try {
      const response = await axios.post(`https://api.trello.com/1/cards/${cardId}/checklists?key=${apiKey}&token=${apiToken}&name=${checklistName}`);
      return response.data;
    } catch (error) {
      console.error('Error creating checklist:', error);
      throw error;
    }
  };
  
  
  export const deleteChecklist = async (checklistId) => {
    try {
      const response = await axios.delete(`https://api.trello.com/1/checklists/${checklistId}?key=${apiKey}&token=${apiToken}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting checklist:', error);
      throw error;
    }
  };


export const getChecklistDetails = async (checklistId) => {
  try {
    const response = await axios.get(`https://api.trello.com/1/checklists/${checklistId}?key=${apiKey}&token=${apiToken}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching checklist details:', error);
    throw error;
  }
};

export const getCheckItemsForChecklist = async (checklistId) => {
  try {
    const response = await axios.get(`https://api.trello.com/1/checklists/${checklistId}/checkItems?key=${apiKey}&token=${apiToken}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching check items:', error);
    throw error;
  }
};

export const createCheckItem = async (checklistId, checkItemName) => {
  try {
    const response = await axios.post(`https://api.trello.com/1/checklists/${checklistId}/checkItems?key=${apiKey}&token=${apiToken}&name=${checkItemName}`);
    return response.data;
  } catch (error) {
    console.error('Error adding check item:', error);
    throw error;
  }
};

export const deleteCheckItem = async (checklistId, itemId) => {
  try {
    const response = await axios.delete(`https://api.trello.com/1/checklists/${checklistId}/checkItems/${itemId}?key=${apiKey}&token=${apiToken}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting check item:', error);
    throw error;
  }
};

export const toggleCheckItem = async (selectCardId, checklistId, itemId, currentState) => {
  try {
    const newState = currentState === 'complete' ? 'incomplete' : 'complete';
    const response = await axios.put(`https://api.trello.com/1/cards/${selectCardId}/checklist/${checklistId}/checkItem/${itemId}?key=${apiKey}&token=${apiToken}&state=${newState}`);
    return response.data;
  } catch (error) {
    console.error('Error toggling check item state:', error);
    throw error;
  }
};