import { SET_USER, LOGIN_ERROR } from '../Actions/login';

const initialState = {
  user: null,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return Object.assign({}, state, { user: action.user, error: null });
    case LOGIN_ERROR:
      return Object.assign({}, state, { error: action.error });
    default:
      return state;
  }
};
