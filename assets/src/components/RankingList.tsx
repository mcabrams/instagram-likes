import * as React from 'react';

import { LikeRankingsData } from '../ducks/instagramAuth/reducers';
import { Ranking } from './Ranking';

interface RankingListProps {
  rankings: LikeRankingsData[];
}

export const RankingList = (props: RankingListProps) => {
  const rankings = props.rankings.map((ranking) => {
    return <Ranking {...ranking} key={ranking.rank} />;
  });

  return (
    <ul>
      {rankings}
    </ul>
  );
};
