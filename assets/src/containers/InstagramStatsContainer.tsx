import * as React from 'react';
import { connect } from 'react-redux';

import { InstagramStats } from '../components/InstagramStats';
import { fetchInstagramLikeStats } from '../ducks/instagramAuth/actions';
import { Dispatch, RootState } from '../index';

const mapStateToProps = (state: RootState) => {
  return {
    loggedIn: !!state.main.instagramAuth.loggedInAs,
    requestingStats: state.main.instagramAuth.requestingLikeStats,
    stats: state.main.instagramAuth.likeRankings,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetchStats: () => dispatch(fetchInstagramLikeStats()),
  };
};

const InstagramStatsContainer = connect(
  mapStateToProps, mapDispatchToProps)(InstagramStats);

export default InstagramStatsContainer;
