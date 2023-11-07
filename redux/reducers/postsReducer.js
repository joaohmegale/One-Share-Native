const initialState = {
  posts:[],
  loading: false,
  error: false,
}

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_POSTS':
      return {
        ...state,
          posts: action.posts
      };
    case 'ADD_POST':
      return {
        ...state,
        posts: [...state.posts, action.post]
      };
    default:
      return state;
  }
};

export default postsReducer;