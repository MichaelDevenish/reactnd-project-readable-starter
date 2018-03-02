// Attribute	Type	Description
// id	String	Unique identifier
// timestamp	Integer	Time created - default data tracks this in Unix time. You can use Date.now() to get this number
// title	String	Post title
// body	String	Post body
// author	String	Post author
// category	String	Should be one of the categories provided by the server
// voteScore	Integer	Net votes the post has received (default: 1)
// deleted	Boolean	Flag if post has been 'deleted' (inaccessible by the front end), (default: false)
import uuid from 'uuid/v1'
import axios from 'axios'

export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const EDIT_POST = 'EDIT_POST'

// todo add thunks to update the data and return filled out data
export function addPost ({
  id,
  timestamp,
  title,
  body,
  author,
  category,
  voteScore,
  deleted,
  commentCount
}) {
  return {
    type: ADD_POST,
    title,
    body,
    author,
    category,
    voteScore,
    deleted,
    timestamp,
    id,
    commentCount
  }
}

export function editPost ({
  id,
  title,
  body
}) {
  return {
    type: EDIT_POST,
    id,
    title,
    body
  }
}

export function deletePost ({
  id
}) {
  return {
    type: DELETE_POST,
    id
  }
}

export function upvotePost ({
  id
}) {
  return {
    type: UPVOTE_POST,
    id
  }
}

export function downvotePost ({
  id
}) {
  return {
    type: DOWNVOTE_POST,
    id
  }
}

export function editPostAsync ({
  id,
  title,
  body
}) {
  return dispatch => axios.put(`http://127.0.0.1:3001/posts/${id}`,
  { id, title, body },
  {headers: {Authorization: 'Bearer potato'}})
  .then((resp) => {
    dispatch(editPost({id, title, body}))
  })
}

export function deletePostAsync ({
  id
}) {
  return dispatch => axios.delete(`http://127.0.0.1:3001/posts/${id}`,
  {headers: {Authorization: 'Bearer potato'}})
  .then((resp) => {
    dispatch(deletePost({id: id}))
  })
}

export function createPostAsync ({
  title,
  body,
  author,
  category
}) {
  const voteScore = 1
  const deleted = false
  const timestamp = Date.now()
  const id = uuid()
  const commentCount = 0

  return dispatch => axios.post(`http://127.0.0.1:3001/posts`,
    { id, timestamp, title, body, author, category },
    {headers: {Authorization: 'Bearer potato'}})
    .then((resp) => {
      dispatch(addPost({
        title,
        body,
        author,
        category,
        id,
        timestamp,
        voteScore,
        deleted,
        commentCount
      }))
    })
}

export function upvotePostAsync ({
  id
}) {
  return dispatch => axios.post(`http://127.0.0.1:3001/posts/${id}`,
    {option: 'upVote'},
    {headers: {Authorization: 'Bearer potato'}})
    .then((resp) => {
      dispatch(upvotePost({id: id}))
    })
}

export function downvotePostAsync ({
  id
}) {
  return dispatch => axios.post(`http://127.0.0.1:3001/posts/${id}`,
    {option: 'downVote'},
    {headers: {Authorization: 'Bearer potato'}})
    .then((resp) => {
      dispatch(downvotePost({id: id}))
    })
}
