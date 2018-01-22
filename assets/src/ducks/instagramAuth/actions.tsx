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

export interface RankingResponseEntry {
  username: string;
  like_count: number;
  rank: number;
}

export interface FetchInstagramLikeStatsFulfilledAction {
  payload: RankingResponseEntry[];
  type: 'FETCH_INSTAGRAM_LIKE_STATS_FULFILLED';
}

interface FetchInstagramLikeStatsFailedAction {
  type: 'FETCH_INSTAGRAM_LIKE_STATS_FAILED';
}

export type Actions = FetchInstagramLoginStateAction
  | FetchInstagramLoginStateFulfilledAction
  | FetchInstagramLikeStatsAction
  | FetchInstagramLikeStatsFailedAction
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
  payload: RankingResponseEntry[]): FetchInstagramLikeStatsFulfilledAction {
  return {
    payload,
    type: 'FETCH_INSTAGRAM_LIKE_STATS_FULFILLED',
  };
}

export function fetchInstagramLikeStatsFailed():
  FetchInstagramLikeStatsFailedAction {
  return {
    type: 'FETCH_INSTAGRAM_LIKE_STATS_FAILED',
  };
}
