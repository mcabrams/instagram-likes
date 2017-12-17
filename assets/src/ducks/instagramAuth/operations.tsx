import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { Action, Store } from 'redux';
import { ActionsObservable } from 'redux-observable';
import {
  FetchInstagramLoginStateAction,
  FetchInstagramLikeStatsAction,
  fetchInstagramLoginStateFulfilled,
  fetchInstagramLikeStatsFulfilled,
} from './actions';
import { RootState } from '../../index';

export const instagramAuthEpic =
  (action$: ActionsObservable<Action>, store: Store<RootState>): Observable<Action> => {
    return action$.ofType('FETCH_INSTAGRAM_LOGIN_STATE')
      .mergeMap((action: FetchInstagramLoginStateAction) => {
        return ajax.getJSON('/instagram-oauth-token')
          .map((response: {user: {username: string}}) => {
            return fetchInstagramLoginStateFulfilled(response);
          });
      });
  };

export const instagramLikeStatsEpic =
  (action$: ActionsObservable<Action>, store: Store<RootState>): Observable<Action> => {
    return action$.ofType('FETCH_INSTAGRAM_LIKE_STATS')
      .mergeMap((action: FetchInstagramLikeStatsAction) => {
        return ajax.getJSON('/like-counts')
          .map((response: object) => {
            return fetchInstagramLikeStatsFulfilled(response);
          });
      });
  };
