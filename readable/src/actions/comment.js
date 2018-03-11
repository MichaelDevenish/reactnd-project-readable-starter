import uuid from 'uuid/v1';
import axios from 'axios';

export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT';
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';

export function editComment ({
  id,
  body
}) {
  return {
    type: EDIT_COMMENT,
    id,
    body
  }
}

export function addComment ({
  parentId,
  timestamp,
  body,
  author,
  category,
  voteScore,
  deleted,
  id
  }) {
  return {
    type: ADD_COMMENT,
    parentId,
    timestamp,
    body,
    author,
    category,
    voteScore,
    deleted,
    id
  }
}

export function deleteComment ({
  id
}) {
  return {
    type: DELETE_COMMENT,
    id
  }
}

export function upvoteComment ({
  id
}) {
  return {
    type: UPVOTE_COMMENT,
    id
  }
}

export function downvoteComment ({
  id
}) {
  return {
    type: DOWNVOTE_COMMENT,
    id
  }
}

export function createCommentAsync ({
  parentId,
  body,
  author,
  category
}) {
  const voteScore = 1;
  const deleted = false;
  const timestamp = Date.now();
  const id = uuid();

  //use axios to post a comment to the server then add it to the redux store using dispatch
  return dispatch => axios.post(`http://127.0.0.1:3001/comments`,
    { id, timestamp, parentId, body, author, category },
    {headers: {Authorization: 'Bearer potato'}})
    .then((resp) => {
      dispatch(addComment({
        parentId,
        body,
        author,
        category,
        id,
        timestamp,
        voteScore,
        deleted
      }));
    }
  );
}

export function editCommentAsync ({
  id,
  body
}) {
    //use axios to put a comment to the server then modify it in the redux store using dispatch
  return dispatch => axios.put(`http://127.0.0.1:3001/comments/${id}`,
    {body},
    {headers: {Authorization: 'Bearer potato'}})
    .then((resp) => {
      dispatch(editComment({id, body}));
    }
  );
}

export function upvoteCommentAsync ({
  id
}) {
  //use axios to post a comment upvote to the server then modify it in the redux store using dispatch
  return dispatch => axios.post(`http://127.0.0.1:3001/comments/${id}`,
    {option: 'upVote'},
    {headers: {Authorization: 'Bearer potato'}})
    .then((resp) => {
      dispatch(upvoteComment({id: id}));
    });
}

export function downvoteCommentAsync ({
  id
}) {
  //use axios to post a comment downvote to the server then modify it in the redux store using dispatch
  return dispatch => axios.post(`http://127.0.0.1:3001/comments/${id}`,
    {option: 'downVote'},
    {headers: {Authorization: 'Bearer potato'}})
    .then((resp) => {
      dispatch(downvoteComment({id: id}));
    });
}

export function deleteCommentAsync ({
  id
}) {
  //use axios to delete a comment on the server then remove it in the redux store using dispatch
  return dispatch => axios.delete(`http://127.0.0.1:3001/comments/${id}`,
    {headers: {Authorization: 'Bearer potato'}})
    .then((resp) => {
      dispatch(deleteComment({id: id}));
    });
}