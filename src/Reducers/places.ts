import { SET_PLACES } from '../Actions/places'

const defaultState = {
  loading: false,
  places: [],
}

export default (state = defaultState, action: any) => {
  switch (action.type) {
    case SET_PLACES:
      return Object.assign({}, state, { places: action.places })
    default:
      return state
  }
}
