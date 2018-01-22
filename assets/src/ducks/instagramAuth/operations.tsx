import { Observable } from 'rxjs';
import { Action, Store } from 'redux';
import { ActionsObservable } from 'redux-observable';
import {
  FetchInstagramLoginStateAction,
  FetchInstagramLikeStatsAction,
  LoginPayload,
  RankingResponseEntry,
  fetchInstagramLoginStateFulfilled,
  fetchInstagramLikeStatsFulfilled,
  fetchInstagramLikeStatsFailed,
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

export const instagramLikeStatsEpic =
  (action$: ActionsObservable<Action>,
   store: Store<RootState>,
   { getJSON }: {getJSON: (url: string) => Observable<object> },
  ): Observable<Action> => {
    return action$.ofType('FETCH_INSTAGRAM_LIKE_STATS')
      .mergeMap((action: FetchInstagramLikeStatsAction) => {
        return getJSON('/like-counts')
          .map((response: RankingResponseEntry[]) => {
            return fetchInstagramLikeStatsFulfilled(response);
          });
      })
      .catch(err => Observable.of(fetchInstagramLikeStatsFailed()));
  };
