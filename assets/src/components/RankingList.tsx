import * as React from 'react';
import { Table } from 'reactbulma';

import { LikeRankingsData } from '../ducks/instagramAuth/reducers';
import { Ranking } from './Ranking';

interface RankingListProps {
  rankings: LikeRankingsData[];
}

export const RankingList = (props: RankingListProps) => {
  const rankings = props.rankings.map(ranking => (
    <Ranking {...ranking} key={ranking.rank} />
  ));

  return (
    <Table.Body>
      {rankings}
    </Table.Body>
  );
};
