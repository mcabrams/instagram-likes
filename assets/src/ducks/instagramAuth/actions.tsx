export interface FetchInstagramLoginStateAction {
  type: 'FETCH_INSTAGRAM_LOGIN_STATE';
}

export interface FetchInstagramLoginStateFulfilledAction {
  loggedIn: boolean;
  type: 'FETCH_INSTAGRAM_LOGIN_STATE_FULFILLED';
}

export type Actions = FetchInstagramLoginStateAction
  | FetchInstagramLoginStateFulfilledAction;

export function fetchInstagramLoginState(): FetchInstagramLoginStateAction {
  return {
    type: 'FETCH_INSTAGRAM_LOGIN_STATE',
  };
}

export function fetchInstagramLoginStateFulfilled(
  loggedIn: boolean | null): FetchInstagramLoginStateFulfilledAction {
  return {
    loggedIn: !!loggedIn,
    type: 'FETCH_INSTAGRAM_LOGIN_STATE_FULFILLED',
  };
}
