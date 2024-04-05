export const ACTIONS = {
    FETCH_BOARDS: 'FETCH_BOARDS',
    CREATE_BOARD: 'CREATE_BOARD',
    FETCH_LISTS:'FETCH_LISTS',
    DELETE_LISTS:'DELETE_LISTS',
    SET_CARDS:'SET_CARDS'

  };
    
  export const Reducer = (state, action) => {
    switch (action.type) {
      case ACTIONS.FETCH_BOARDS:
        return {
          ...state,
          boards: action.payload,
        };
      case ACTIONS.CREATE_BOARD:
        return {
          ...state,
        };
        case ACTIONS.FETCH_LISTS:
            return{
         ...state, name: action.payload.name, lists: action.payload.lists
            }
            case ACTIONS.DELETE_LISTS:
                return{
                ...state, lists: action.payload
                }
                case ACTIONS.SET_CARDS:
                   return{
                     ...state, cards: action.payload 
                    };
                 default:
                   return state;
    }
  };
  