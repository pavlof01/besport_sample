import { SET_REQUEST_FOR_FRIENDS } from '../Actions/friendRequests';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_REQUEST_FOR_FRIENDS:
      return action.requests;
    default:
      return state;
  }
};
