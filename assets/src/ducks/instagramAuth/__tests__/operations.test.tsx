import 'rxjs';
import { AnyAction } from 'redux';
import { ActionsObservable } from 'redux-observable';

import { Observable } from 'rxjs/Observable';

import { instagramAuthEpic, instagramLikeStatsEpic } from '../operations';
import {
  fetchInstagramLoginStateFulfilled,
  fetchInstagramLikeStatsFulfilled,
} from '../actions';

const mockAction$ = (action: AnyAction) => ActionsObservable.of(action);

describe('instagramAuthEpic', () => {
  const resp = { user: { username: 'foo', profile_picture: 'foo.com' } };
  const getJSON = jest.fn(url => Observable.of(resp));
  const action$ = mockAction$({ type: 'FETCH_INSTAGRAM_LOGIN_STATE' });

  afterEach(() => {
    getJSON.mockClear();
  });

  it('dispatches the correct actions when it is successful', () => {
    const expectedOutputActions = [fetchInstagramLoginStateFulfilled(resp)];

    instagramAuthEpic(action$, null, { getJSON })
      .toArray()
      .subscribe((actualOutputActions: AnyAction[]) => {
        expect(actualOutputActions).toEqual(expectedOutputActions);
      });
  });

  it('gets JSON at correct url', () => {
    instagramAuthEpic(action$, null, { getJSON })
      .subscribe(() => {
        expect(getJSON).toHaveBeenCalledTimes(1);
        expect(getJSON).toHaveBeenCalledWith('/instagram-oauth-token');
      });
  });
});

describe('instagramLikeStatsEpic', () => {
  const resp = { foo: { bar: 'baz' } };
  const getJSON = jest.fn(url => Observable.of(resp));
  const action$ = mockAction$({ type: 'FETCH_INSTAGRAM_LIKE_STATS' });

  afterEach(() => {
    getJSON.mockClear();
  });

  it('dispatches the correct actions when it is successful', () => {
    const expectedOutputActions = [fetchInstagramLikeStatsFulfilled(resp)];

    instagramLikeStatsEpic(action$, null, { getJSON })
      .toArray()
      .subscribe((actualOutputActions: AnyAction[]) => {
        expect(actualOutputActions).toEqual(expectedOutputActions);
      });
  });

  it('gets JSON at correct url', () => {
    instagramLikeStatsEpic(action$, null, { getJSON })
      .subscribe(() => {
        expect(getJSON).toHaveBeenCalledTimes(1);
        expect(getJSON).toHaveBeenCalledWith('/like-counts');
      });
  });
});
