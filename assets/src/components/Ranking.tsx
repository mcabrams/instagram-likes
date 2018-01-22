import * as React from 'react';
import ordinal from '../utilities/ordinal';

export interface RankingProps {
  likeCount: number;
  rank: number;
  username: string;
}

export const Ranking = (props: RankingProps) => {
  return (
    <li>{ordinal(props.rank)}: {props.username}, {props.likeCount} Likes</li>
  );
};
