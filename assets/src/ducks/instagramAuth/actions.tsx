export function fetchInstagramLoginState() {
  return {
    type: 'FETCH_INSTAGRAM_LOGIN_STATE',
  };
}

export function fetchInstagramLoginStateFulfilled(loggedIn: boolean | null) {
  return {
    loggedIn: !!loggedIn,
    type: 'FETCH_INSTAGRAM_LOGIN_STATE_FULFILLED',
  };
}
