import { createStore, combineReducers } from 'redux';
import postsReducer from './reducers/postsReducer'
import userReducer from './reducers/userReducer';
const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
});

const store = createStore(rootReducer);

export default store;