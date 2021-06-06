import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  UPDATE_POST: 'UPDATE_POST',
  CREATE_POST: 'CREATE_POST',
  DELETE_POST: 'DELETE_POST',
};

const ROOT_URL = 'https://platform.cs52.me/api';
const API_KEY = '?key=Ravin_Anderson';

export function fetchPosts() {
  // ActionCreator returns a function
  // that gets called with dispatch
  // remember (arg) => { } is a function
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts${API_KEY}`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_POSTS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function createPost(post, history) {
  console.log(post.coverUrl);
  const fields = {
    title: post.title, content: post.content, tags: post.tags, coverUrl: post.coverUrl,
  };
  return (dispatch) => {
    console.log(fields);
    axios.post(`${ROOT_URL}/posts${API_KEY}`, fields, { headers: { authorization: localStorage.getItem('token') } }).then(() => {
      console.log('done');
      history.push('/');
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function updatePost(id, post) {
  const fields = {
    title: post.title, content: post.content, tags: post.tags, coverUrl: post.coverUrl,
  };

  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${id}${API_KEY}`, fields, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.UPDATE_POST, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function fetchPost(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`)
      .then((response) => {
        console.log(response);
        dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function deletePost(id, history) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        history.push('/');
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}
