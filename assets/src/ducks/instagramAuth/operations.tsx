import { Observable } from 'rxjs';
import { Action, Store } from 'redux';
import { ActionsObservable } from 'redux-observable';
import {
  FetchInstagramLoginStateAction,
  FetchInstagramLikeRankingsAction,
  LoginPayload,
  RankingResponseEntry,
  fetchInstagramLoginStateFulfilled,
  fetchInstagramLikeRankingsFulfilled,
  fetchInstagramLikeRankingsFailed,
} from './actions';
import { RootState } from '../../index';

export const instagramAuthEpic =
  (action$: ActionsObservable<Action>,
   store: Store<RootState>,
   { getJSON }: {getJSON: (url: string) => Observable<object> },
  ): Observable<Action> => {
    return action$.ofType('FETCH_INSTAGRAM_LOGIN_STATE')
      .mergeMap((action: FetchInstagramLoginStateAction) => {
        return getJSON('/instagram-oauth-token')
          .map((response: LoginPayload) => {
            return fetchInstagramLoginStateFulfilled(response);
          });
      });
  };

export const instagramLikeRankingsEpic =
  (action$: ActionsObservable<Action>,
   store: Store<RootState>,
   { getJSON }: {getJSON: (url: string) => Observable<object> },
  ): Observable<Action> => {
    return action$.ofType('FETCH_INSTAGRAM_LIKE_RANKINGS')
      .mergeMap((action: FetchInstagramLikeRankingsAction) => {
        return getJSON('/like-counts')
          .map((response: RankingResponseEntry[]) => {
            return fetchInstagramLikeRankingsFulfilled(response);
          });
      })
      .catch(err => Observable.of(fetchInstagramLikeRankingsFailed()));
  };
