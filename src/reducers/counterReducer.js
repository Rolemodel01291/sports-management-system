// Initial State
const initialState = {
    user: {},
    addProfileResult:{},
    profiles:'',
    gametrackerId:''    
  };
  // Redux: Counter Reducer
  const counterReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SIGN_UP_SUCCESS': {
        return {
          ...state,
          user: action.value,
        };
      }
      case 'SIGN_UP_ERROR': {
        return {
          ...state,
          user: action.value,
        };
      }
      case 'LOG_IN_SUCCESS': {
        return {
          ...state,
          user: action.value,
        };
      }
      case 'ADD_PROFILE_SUCCESS': {
        return {
          ...state,
          addProfileResult: action.value,
        };
      }
      case 'ADD_PROFILE_ERROR': {
        return {
          ...state,
          addProfileResult: action.value,
        };
      }
      case 'GET_PROFILE_SUCCESS': {
        return {
          ...state,
          profiles: action.value,
        };
      }
      case 'SET_GAMETRACKER_ID': {
        return {
          ...state,
          gametrackerId: action.value,
        };
      }
      default: {
        return state;
      }
    }
  };

  export default counterReducer;