export interface FetchInstagramLoginStateAction {
  type: 'FETCH_INSTAGRAM_LOGIN_STATE';
}

export interface FetchInstagramLoginStateFulfilledAction {
  loggedInAs: { username: string, profilePictureUrl: string} | null;
  type: 'FETCH_INSTAGRAM_LOGIN_STATE_FULFILLED';
}

export interface FetchInstagramLikeRankingsAction {
  type: 'FETCH_INSTAGRAM_LIKE_RANKINGS';
}

export interface RankingResponseEntry {
  username: string;
  profile_photo: string;
  like_count: number;
  rank: number;
}

export interface FetchInstagramLikeRankingsFulfilledAction {
  payload: RankingResponseEntry[];
  type: 'FETCH_INSTAGRAM_LIKE_RANKINGS_FULFILLED';
}

interface FetchInstagramLikeRankingsFailedAction {
  type: 'FETCH_INSTAGRAM_LIKE_RANKINGS_FAILED';
}

export type Actions = FetchInstagramLoginStateAction
  | FetchInstagramLoginStateFulfilledAction
  | FetchInstagramLikeRankingsAction
  | FetchInstagramLikeRankingsFailedAction
  | FetchInstagramLikeRankingsFulfilledAction;

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

export function fetchInstagramLikeRankings(): FetchInstagramLikeRankingsAction {
  return {
    type: 'FETCH_INSTAGRAM_LIKE_RANKINGS',
  };
}

export function fetchInstagramLikeRankingsFulfilled(
  payload: RankingResponseEntry[]): FetchInstagramLikeRankingsFulfilledAction {
  return {
    payload,
    type: 'FETCH_INSTAGRAM_LIKE_RANKINGS_FULFILLED',
  };
}

export function fetchInstagramLikeRankingsFailed():
  FetchInstagramLikeRankingsFailedAction {
  return {
    type: 'FETCH_INSTAGRAM_LIKE_RANKINGS_FAILED',
  };
}
