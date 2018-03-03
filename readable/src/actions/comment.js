// Attribute	Type	Description
// id	String	Unique identifier
// parentId	String	id of the parent post
// timestamp	Integer	Time created - default data tracks this in Unix time. You can use Date.now() to get this number
// body	String	Comment body
// author	String	Comment author
// voteScore	Integer	Net votes the comment has received (default: 1)
// deleted	Boolean	Flag if comment has been 'deleted' (inaccessible by the front end), (default: false)
// parentDeleted	Boolean	Flag for when the the parent post was deleted, but the comment itself was not.

import uuid from 'uuid/v1'
import axios from 'axios'

export const CREATE_COMMENT = 'CREATE_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT'
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'

// todo add thunks to update the daata and return filled out data

export function createComment ({
  parentId,
  body,
  author,
  category
}) {
  return {
    type: CREATE_COMMENT,
    parentId,
    body,
    author,
    category,
    voteScore: 1,
    deleted: false,
    timestamp: Date.now(),
    id: uuid()
  }
}

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
    type: CREATE_COMMENT,
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

export function editCommentAsync ({
  id,
  body
}) {
  return dispatch => axios.put(`http://127.0.0.1:3001/comments/${id}`,
    {body},
    {headers: {Authorization: 'Bearer potato'}})
    .then((resp) => {
      dispatch(editComment({id, body}))
    })
}

export function upvoteCommentAsync ({
  id
}) {
  return dispatch => axios.post(`http://127.0.0.1:3001/comments/${id}`,
    {option: 'upVote'},
    {headers: {Authorization: 'Bearer potato'}})
    .then((resp) => {
      dispatch(upvoteComment({id: id}))
    })
}

export function downvoteCommentAsync ({
  id
}) {
  return dispatch => axios.post(`http://127.0.0.1:3001/comments/${id}`,
    {option: 'downVote'},
    {headers: {Authorization: 'Bearer potato'}})
    .then((resp) => {
      dispatch(downvoteComment({id: id}))
    })
}

export function deleteCommentAsync ({
  id
}) {
  return dispatch => axios.delete(`http://127.0.0.1:3001/comments/${id}`,
    {headers: {Authorization: 'Bearer potato'}})
    .then((resp) => {
      dispatch(deleteComment({id: id}))
    })
}