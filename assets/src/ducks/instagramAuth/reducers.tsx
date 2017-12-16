const initialState = {
  loggedIn: false,
  requestingLogin: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_INSTAGRAM_LOGIN_STATE_FULFILLED':
      return { loggedIn: action.loggedIn, requestingLogin: false };
    default:
      return state;
  }
};

export default reducer;
