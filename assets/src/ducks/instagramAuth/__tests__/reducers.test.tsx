import reducer from '../reducers';

describe('FETCH_INSTAGRAM_LIKE_RANKINGS_FULFILLED', () => {
  it('should set likeRankings', () => {
    const action = {
      type: 'FETCH_INSTAGRAM_LIKE_RANKINGS_FULFILLED',
      payload: [
        {
          username: 'fred',
          like_count: 3,
          rank: 1,
        },
        {
          username: 'todd',
          like_count: 1,
          rank: 2,
        },
      ],
    };

    expect(reducer(undefined, action)).toEqual({
      likeRankings: {
        data: [
          {
            username: 'fred',
            likeCount: 3,
            rank: 1,
          },
          {
            username: 'todd',
            likeCount: 1,
            rank: 2,
          },
        ],
      },
      loggedInAs: null,
      requestingLikeRankings: false,
      requestingLogin: false,
    });
  });
});
