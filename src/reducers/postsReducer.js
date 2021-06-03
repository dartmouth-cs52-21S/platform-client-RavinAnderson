import { ActionTypes } from '../actions';

const postsReducer = (state = {
  all: [],
  current: {},
}, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS:
      return { ...state, all: action.payload };
    case ActionTypes.FETCH_POST:
      return { ...state, current: action.payload };
    case ActionTypes.UPDATE_POST:
      return { ...state, current: action.payload };
    default:
      return state;
  }
};

export default postsReducer;
