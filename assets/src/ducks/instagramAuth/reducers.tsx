import { Reducer } from 'redux';
import { RootAction } from '../../index';

export interface LikeRankingsData {
  username: string;
  profilePhoto: string;
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
  requestingLikeRankings: boolean;
  requestingLogin: boolean;
}

const initialState: InstagramAuthState = {
  loggedInAs: null,
  requestingLogin: false,
  requestingLikeRankings: false,
  likeRankings: null,
};

const reducer: Reducer<InstagramAuthState> =
  (state: InstagramAuthState = initialState, action: RootAction) => {
    switch (action.type) {
      case 'FETCH_INSTAGRAM_LIKE_RANKINGS':
        return {
          ...state,
          requestingLikeRankings: true,
        };
      case 'FETCH_INSTAGRAM_LIKE_RANKINGS_FAILED':
        return {
          ...state,
          requestingLikeRankings: false,
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
      case 'FETCH_INSTAGRAM_LIKE_RANKINGS_FULFILLED':
        const data = action.payload.map(
          ({ username, like_count, profile_photo, rank }) => ({
            rank,
            username,
            likeCount: like_count,
            profilePhoto: profile_photo,
          }),
        );

        return {
          ...state,
          likeRankings: {
            data,
          },
          requestingLikeRankings: false,
        };
      default:
        return state;
    }
  };

export default reducer;
