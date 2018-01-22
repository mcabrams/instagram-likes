import * as React from 'react';

import { LikeRankingsData } from '../ducks/instagramAuth/reducers';
import { Ranking } from './Ranking';

interface RankingListProps {
  stats: LikeRankingsData[];
}

export const RankingList = (props: RankingListProps) => {
  const rankings = props.stats.map((ranking) => {
    return <Ranking {...ranking} key={ranking.rank} />;
  });

  return (
    <ul>
      {rankings}
    </ul>
  );
};
