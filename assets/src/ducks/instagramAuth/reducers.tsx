import { Reducer } from 'redux';
export interface InstagramAuthState {
  loggedIn: boolean;
  requestingLogin: boolean;
}

const initialState: InstagramAuthState = {
  loggedIn: false,
  requestingLogin: false,
};

const reducer: Reducer<InstagramAuthState> =
  (state: InstagramAuthState = initialState, action) => {
    switch (action.type) {
      case 'FETCH_INSTAGRAM_LOGIN_STATE_FULFILLED':
        return { loggedIn: action.loggedIn, requestingLogin: false };
      default:
        return state;
    }
  };

export default reducer;
