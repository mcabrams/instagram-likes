import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { Action, Store } from 'redux';
import { ActionsObservable } from 'redux-observable';
import {
  FetchInstagramLoginStateAction,
  fetchInstagramLoginStateFulfilled,
} from './actions';
import { RootState } from '../../index';

export const instagramAuthEpic =
  (action$: ActionsObservable<Action>, store: Store<RootState>): Observable<Action> => {
    return action$.ofType('FETCH_INSTAGRAM_LOGIN_STATE')
      .mergeMap((action: FetchInstagramLoginStateAction) => {
        return ajax.getJSON('/instagram-oauth-token')
          .map((response: boolean | null) => {
            return fetchInstagramLoginStateFulfilled(response);
          });
      });
  };
