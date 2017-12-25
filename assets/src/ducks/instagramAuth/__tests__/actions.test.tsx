import {
  fetchInstagramLoginState, fetchInstagramLoginStateFulfilled,
  fetchInstagramLikeStats, fetchInstagramLikeStatsFulfilled,
} from '../actions';

describe('fetchInstagramLoginState', () => {
  it('should return event', () => {
    expect(fetchInstagramLoginState()).toEqual({
      type: 'FETCH_INSTAGRAM_LOGIN_STATE',
    });
  });
});

describe('fetchInstagramLoginStateFulfilled', () => {
  it('should mark loggedInAs as null if no payload', () => {
    const payload: null = null;

    expect(fetchInstagramLoginStateFulfilled(payload)).toEqual({
      loggedInAs: null,
      type: 'FETCH_INSTAGRAM_LOGIN_STATE_FULFILLED',
    });
  });

  it('should mark loggedInAs if proper payload', () => {
    const username = 'foobar';
    const profilePictureUrl = 'foobar.com';
    const payload = {
      user: {
        username,
        profile_picture: profilePictureUrl,
      },
    };

    expect(fetchInstagramLoginStateFulfilled(payload)).toEqual({
      loggedInAs: {
        username,
        profilePictureUrl,
      },
      type: 'FETCH_INSTAGRAM_LOGIN_STATE_FULFILLED',
    });
  });
});
