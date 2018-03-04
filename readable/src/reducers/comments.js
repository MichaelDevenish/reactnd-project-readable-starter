import {
  DELETE_COMMENT,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT,
  ADD_COMMENT,
  EDIT_COMMENT
} from '../actions/comment'

export default function (state = {}, action) {
  switch (action.type) {
    case EDIT_COMMENT:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          body: action.body
        }
      }
    case ADD_COMMENT:
      return {
        ...state,
        [action.id]: action
      }
    case DELETE_COMMENT:
      return {
        ...state,
        [action.id]: null
      }
    case UPVOTE_COMMENT:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore: state[action.id].voteScore + 1
        }
      }
    case DOWNVOTE_COMMENT:
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
