import {
  DELETE_POST,
  UPVOTE_POST,
  DOWNVOTE_POST,
  ADD_POST,
  EDIT_POST
} from '../actions/post'

// todo state modification

export default function (state = {}, action) {
  switch (action.type) {
    case EDIT_POST:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          title: action.title,
          body: action.body
        }
      }
    case ADD_POST:
      return {
        ...state,
        [action.id]: action
      }
    case DELETE_POST:
      return {
        ...state,
        [action.id]: null
      }
    case UPVOTE_POST:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore: state[action.id].voteScore + 1
        }
      }
    case DOWNVOTE_POST:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore: state[action.id].voteScore - 1
        }
      }
    default:
      return state
  }
}
