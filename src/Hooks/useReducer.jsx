export const BOARD_ACTIONS = {
    FETCH_BOARDS_SUCCESS: 'FETCH_BOARDS_SUCCESS',
    FETCH_BOARDS_ERROR: 'FETCH_BOARDS_ERROR',
    CREATE_BOARD_SUCCESS: 'CREATE_BOARD_SUCCESS',
    CREATE_BOARD_ERROR: 'CREATE_BOARD_ERROR',
  };
  
  export const BOARD_LISTS_ACTIONS = {
    FETCH_BOARD_SUCCESS: 'FETCH_BOARD_SUCCESS',
    FETCH_BOARD_ERROR: 'FETCH_BOARD_ERROR',
    FETCH_LISTS_SUCCESS: 'FETCH_LISTS_SUCCESS',
    FETCH_LISTS_ERROR: 'FETCH_LISTS_ERROR',
    CREATE_LIST_SUCCESS: 'CREATE_LIST_SUCCESS',
    CREATE_LIST_ERROR: 'CREATE_LIST_ERROR',
    DELETE_LIST_SUCCESS: 'DELETE_LIST_SUCCESS',
    DELETE_LIST_ERROR: 'DELETE_LIST_ERROR',
  };
  
  export const boardReducer = (state, action) => {
    switch (action.type) {
      case BOARD_ACTIONS.FETCH_BOARDS_SUCCESS:
        return {
          ...state,
          loading: false,
          boards: action.payload,
        };
      case BOARD_ACTIONS.FETCH_BOARDS_ERROR:
        return {
          ...state,
          loading: false,
          error: 'Error fetching boards. Please try again later.',
        };
      case BOARD_ACTIONS.CREATE_BOARD_SUCCESS:
        return {
          ...state,
          success: 'Board created successfully.',
        };
      case BOARD_ACTIONS.CREATE_BOARD_ERROR:
        return {
          ...state,
          error: 'Error creating board. Please try again.',
        };
      default:
        return state;
    }
  };
  
  export const boardListsReducer = (state, action) => {
    switch (action.type) {
      case BOARD_LISTS_ACTIONS.FETCH_BOARD_SUCCESS:
        return {
          ...state,
          loading: false,
          boardData: action.payload,
        };
      case BOARD_LISTS_ACTIONS.FETCH_BOARD_ERROR:
        return {
          ...state,
          loading: false,
          error: 'Error fetching board data. Please try again later.',
        };
      case BOARD_LISTS_ACTIONS.FETCH_LISTS_SUCCESS:
        return {
          ...state,
          loading: false,
          lists: action.payload,
        };
      case BOARD_LISTS_ACTIONS.FETCH_LISTS_ERROR:
        return {
          ...state,
          loading: false,
          error: 'Error fetching lists data. Please try again later.',
        };
      case BOARD_LISTS_ACTIONS.CREATE_LIST_SUCCESS:
        return {
          ...state,
          success: 'List created successfully.',
        };
      case BOARD_LISTS_ACTIONS.CREATE_LIST_ERROR:
        return {
          ...state,
          error: 'Error creating list. Please try again.',
        };
      case BOARD_LISTS_ACTIONS.DELETE_LIST_SUCCESS:
        return {
          ...state,
          success: 'List deleted successfully.',
        };
      case BOARD_LISTS_ACTIONS.DELETE_LIST_ERROR:
        return {
          ...state,
          error: 'Error deleting list. Please try again.',
        };
      default:
        return state;
    }
  };
  