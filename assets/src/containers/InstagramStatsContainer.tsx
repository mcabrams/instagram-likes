import * as React from 'react';
import { connect } from 'react-redux';

import { InstagramStats } from '../components/InstagramStats';
import { fetchInstagramLikeRankings } from '../ducks/instagramAuth/actions';
import { Dispatch, RootState } from '../index';

const mapStateToProps = (state: RootState) => {
  return {
    loggedIn: !!state.main.instagramAuth.loggedInAs,
    requestingStats: state.main.instagramAuth.requestingLikeRankings,
    stats: state.main.instagramAuth.likeRankings,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetchStats: () => dispatch(fetchInstagramLikeRankings()),
  };
};

const InstagramStatsContainer = connect(
  mapStateToProps, mapDispatchToProps)(InstagramStats);

export default InstagramStatsContainer;
