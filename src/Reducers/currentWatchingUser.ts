import { SET_USER_DATA, LOAD_USER_DATA } from '../Actions/currentWatchingUser';

const initialState: any = {
    user: null,
    loading: true
};

export default (state: any = initialState, action: any) => {
  switch (action.type) {
    case LOAD_USER_DATA:
        return {...state, loading: true}
    case SET_USER_DATA:
      return {...state, user: action.user, loading: false}
    default:
      return state;
  }
};
