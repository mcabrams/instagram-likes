import { ajax } from 'rxjs/observable/dom/ajax';
import { fetchInstagramLoginStateFulfilled } from './actions';

export const instagramAuthEpic = (action$, store) => {
  return action$.ofType('FETCH_INSTAGRAM_LOGIN_STATE')
    .mergeMap((action) => {
      return ajax.getJSON('/instagram-oauth-token')
        .map(response => fetchInstagramLoginStateFulfilled(response));
    });
};
