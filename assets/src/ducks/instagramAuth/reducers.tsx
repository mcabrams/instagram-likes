import { Reducer } from 'redux';
import { RootAction } from '../../index';

export interface LikeStats {
  error?: string;
}

export interface InstagramAuthState {
  likeStats: LikeStats | null;
  loggedInAs: object | null;
  requestingLikeStats: boolean;
  requestingLogin: boolean;
}

const initialState: InstagramAuthState = {
  loggedInAs: null,
  requestingLogin: false,
  requestingLikeStats: false,
  likeStats: null,
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
          likeStats: {
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
        return {
          ...state,
          requestingLikeStats: false,
          likeStats: action.payload,
        };
      default:
        return state;
    }
  };

export default reducer;
