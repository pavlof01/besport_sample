import { fromJS, List } from 'immutable'
import {
  SET_FOOTBALL_INVITES,
  LOADING_FOOTBALL_INVITES,
} from '../Actions/footballInvites'

const defaultState = fromJS({
  loading: false,
  loaded: false,
  invites: List(),
})

export default (state = defaultState, action: any) => {
  switch (action.type) {
    case LOADING_FOOTBALL_INVITES:
      return state.set('loading', true)
    case SET_FOOTBALL_INVITES:
      return state
        .set('loading', false)
        .set('loaded', true)
        .set('invites', List(action.invites))
    default:
      return state
  }
}
