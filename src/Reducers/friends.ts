import {
  SET_FRIENDS,
  DELETE_FRIEND,
  ADD_FRIEND,
  START_LOAD,
  SET_LAST_MESSAGES_TIME_FETCH,
} from '../Actions/friends'
const defaultState = {
  friends: [],
  loading: false,
  error: false,
}

export default (state = defaultState, action: any) => {
  switch (action.type) {
    case START_LOAD:
      return { ...state, loading: true }
    case SET_FRIENDS:
      return {
        ...state,
        friends: action.friends,
        loading: false,
      }
    case ADD_FRIEND:
      return {
        ...state,
        friends: [...state.friends, action.friend],
      }
    case DELETE_FRIEND:
      return {
        ...state,
        friends: state.friends.filter((friend: any) => friend.id !== action.id),
      }
    default:
      return state
  }
}
