import { fromJS, List, Set } from 'immutable'
import {
  SET_FOOTBALL_GAMES,
  ADD_NEW_GAME,
  LOADING_FOOTBALL_GAMES,
} from '../Actions/football'

const initialState = fromJS({
  loading: false,
  loaded: false,
  games: List(),
})

export default (state = initialState, action: any) => {
  switch (action.type) {
    case LOADING_FOOTBALL_GAMES:
      return state.set('loading', true)
    case SET_FOOTBALL_GAMES:
      return state.set('loading', false).set('loaded', true).set('games', List(action.games))
    case ADD_NEW_GAME:
      const games = state.get('games').toJS()
      const newGames = games.push(action.game)
      return state.set('games', List(newGames))
    default:
      return state
  }
}
