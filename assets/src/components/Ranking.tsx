import * as React from 'react';

export interface RankingProps {
  likeCount: number;
  rank: number;
  username: string;
}

export const Ranking = (props: RankingProps) => {
  return (
    <p>{props.rank}: {props.username}, {props.likeCount}</p>
  );
};
