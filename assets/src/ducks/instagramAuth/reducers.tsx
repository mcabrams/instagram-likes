import { Reducer } from 'redux';
import { RootAction } from '../../index';

export interface LikeRankingsData {
  username: string;
  likeCount: number;
  rank: number;
}

export interface LikeRankings {
  error?: string;
  data?: LikeRankingsData[];
}

export interface InstagramAuthState {
  likeRankings: LikeRankings | null;
  loggedInAs: object | null;
  requestingLikeStats: boolean;
  requestingLogin: boolean;
}

const initialState: InstagramAuthState = {
  loggedInAs: null,
  requestingLogin: false,
  requestingLikeStats: false,
  likeRankings: null,
};

const reducer: Reducer<InstagramAuthState> =
  (state: InstagramAuthState = initialState, action: RootAction) => {
    switch (action.type) {
      case 'FETCH_INSTAGRAM_LIKE_STATS':
        return {
          ...state,
          requestingLikeStats: true,
        };
      case 'FETCH_INSTAGRAM_LIKE_STATS_FAILED':
        return {
          ...state,
          requestingLikeStats: false,
          likeRankings: {
            error: 'Failed to fetch instagram like stats.',
          },
        };
      case 'FETCH_INSTAGRAM_LOGIN_STATE':
        return {
          ...state,
          requestingLogin: true,
        };
      case 'FETCH_INSTAGRAM_LOGIN_STATE_FULFILLED':
        return {
          ...state,
          loggedInAs: action.loggedInAs,
          requestingLogin: false,
        };
      case 'FETCH_INSTAGRAM_LIKE_STATS_FULFILLED':
        const data = action.payload.map(
          ({ username, like_count, rank }) => ({
            rank,
            username,
            likeCount: like_count,
          }),
        );

        return {
          ...state,
          likeRankings: {
            data,
          },
          requestingLikeStats: false,
        };
      default:
        return state;
    }
  };

export default reducer;
