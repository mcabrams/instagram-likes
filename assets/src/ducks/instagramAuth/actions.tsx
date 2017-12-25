export interface FetchInstagramLoginStateAction {
  type: 'FETCH_INSTAGRAM_LOGIN_STATE';
}

export interface FetchInstagramLoginStateFulfilledAction {
  loggedInAs: { username: string, profilePictureUrl: string} | null;
  type: 'FETCH_INSTAGRAM_LOGIN_STATE_FULFILLED';
}

export interface FetchInstagramLikeStatsAction {
  type: 'FETCH_INSTAGRAM_LIKE_STATS';
}

export interface FetchInstagramLikeStatsFulfilledAction {
  payload: object;
  type: 'FETCH_INSTAGRAM_LIKE_STATS_FULFILLED';
}

export type Actions = FetchInstagramLoginStateAction
  | FetchInstagramLoginStateFulfilledAction
  | FetchInstagramLikeStatsAction
  | FetchInstagramLikeStatsFulfilledAction;

export function fetchInstagramLoginState(): FetchInstagramLoginStateAction {
  return {
    type: 'FETCH_INSTAGRAM_LOGIN_STATE',
  };
}

export interface LoginPayload {
  user: {
    username: string,
    profile_picture: string,
  };
}

export function fetchInstagramLoginStateFulfilled(
  payload: null | LoginPayload): FetchInstagramLoginStateFulfilledAction {
  return {
    loggedInAs: payload && {
      username: payload.user.username,
      profilePictureUrl: payload.user.profile_picture,
    },
    type: 'FETCH_INSTAGRAM_LOGIN_STATE_FULFILLED',
  };
}

export function fetchInstagramLikeStats(): FetchInstagramLikeStatsAction {
  return {
    type: 'FETCH_INSTAGRAM_LIKE_STATS',
  };
}

export function fetchInstagramLikeStatsFulfilled(
  payload: object): FetchInstagramLikeStatsFulfilledAction {
  return {
    payload,
    type: 'FETCH_INSTAGRAM_LIKE_STATS_FULFILLED',
  };
}
