import * as React from 'react';
import { connect } from 'react-redux';

import { fetchInstagramLikeStats } from '../ducks/instagramAuth/actions';
import { Dispatch, RootState } from '../index';

export interface InstagramStatsProps {
  loggedIn: boolean;
  stats: object | null;
  requestingStats: boolean;
  fetchStats: () => any;
}

class InstagramStats extends React.Component<InstagramStatsProps> {
  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.fetchStats();
    }
  }

  componentWillReceiveProps(nextProps: InstagramStatsProps) {
    if (nextProps.loggedIn !== this.props.loggedIn && nextProps.loggedIn) {
      this.props.fetchStats();
    }
  }

  render() {
    if (!this.props.loggedIn) {
      return <p>Log in to view stats.</p>;
    }

    if (this.props.requestingStats) {
      return <p>Calculating stats...</p>;
    }

    if (!this.props.stats) {
      return <p>Could not calculate stats.</p>;
    }

    return (
      <p>{JSON.stringify(this.props.stats)}</p>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    loggedIn: !!state.main.instagramAuth.loggedInAs,
    requestingStats: state.main.instagramAuth.requestingLikeStats,
    stats: state.main.instagramAuth.likeStats,
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
