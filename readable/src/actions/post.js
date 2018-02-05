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

export const CREATE_POST = 'CREATE_POST'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'

// todo add thunks to update the daata and return filled out data

export function createPost ({
  title,
  body,
  author,
  category
}) {
  return {
    type: CREATE_POST,
    title,
    body,
    author,
    category,
    voteScore: 1,
    deleted: false,
    timestamp: Date.now(),
    id: uuid(),
    commentCount: 0
  }
}

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
    type: CREATE_POST,
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
