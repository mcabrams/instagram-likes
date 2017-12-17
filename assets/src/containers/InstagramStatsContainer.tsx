import * as React from 'react';
import { connect } from 'react-redux';

import { fetchInstagramLikeStats } from '../ducks/instagramAuth/actions';
import { RootState } from '../index';

export interface InstagramStatsProps {
  loggedIn: boolean;
  stats: object;
  requestingStats: boolean;
}

class InstagramStats extends React.Component<InstagramStatsProps> {
  componentDidMount() {
    this.props.dispatch(fetchInstagramLikeStats());
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

const InstagramStatsContainer = connect(mapStateToProps)(InstagramStats);

export default InstagramStatsContainer;
