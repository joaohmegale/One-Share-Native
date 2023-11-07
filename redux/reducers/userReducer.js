const initialState = {
  username: ''
};

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'STORE_USERNAME':
      return {
        ...state,
        username: action.payload
      };
    default:
      return state;
  }
}

export default userReducer;