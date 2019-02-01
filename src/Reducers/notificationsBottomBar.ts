import { fromJS, Map } from 'immutable'
import { SET_COUNT_UNREAD_MESSAGES } from '../Actions/notificationsBottomBar'

const defaultState = fromJS({
  unreadMessages: Map({}),
  footballInvites: {},
  friendsInvites: {},
  error: null,
  isFetching: false,
})

export default (state = defaultState, action: any) => {
  switch (action.type) {
    case SET_COUNT_UNREAD_MESSAGES:    
      return state.setIn(['unreadMessages', action.id], action.count)
    default:
      return state
  }
}
