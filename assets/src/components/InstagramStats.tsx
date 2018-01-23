import * as React from 'react';
import { Section, Table } from 'reactbulma';

import { LikeRankings } from '../ducks/instagramAuth/reducers';
import { RankingList } from './RankingList';

export interface InstagramStatsProps {
  loggedIn: boolean;
  stats: LikeRankings | null;
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
      <Table className="is-fullwidth">
        <Table.Head>
          <Table.Tr>
            <Table.Th>Rank</Table.Th>
            <Table.Th>Username</Table.Th>
            <Table.Th>Likes</Table.Th>
          </Table.Tr>
        </Table.Head>
        <RankingList rankings={this.props.stats.data} />
      </Table>
    );
  }
}
