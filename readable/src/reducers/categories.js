import {
    CREATE_CATEGORY
} from '../actions/categories'

export default function (state = {}, action) {
  switch (action.type) {
    case CREATE_CATEGORY:
      return {
        ...state,
        [action.name]: action
      }
    default:
      return state
  }
}
