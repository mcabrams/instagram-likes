import * as React from 'react';

import { LikeStats } from '../ducks/instagramAuth/reducers';

export interface InstagramStatsProps {
  loggedIn: boolean;
  stats: LikeStats | null;
  requestingStats: boolean;
  fetchStats: () => any;
}

export class InstagramStats extends React.Component<InstagramStatsProps> {
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

    if (!this.props.stats || this.props.stats.error) {
      return <p>Sorry, we could not calculate your stats.</p>;
    }

    return (
      <p>{JSON.stringify(this.props.stats)}</p>
    );
  }
}
