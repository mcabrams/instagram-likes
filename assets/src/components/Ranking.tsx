import * as React from 'react';
import { Table } from 'reactbulma';

import ordinal from '../utilities/ordinal';

export interface RankingProps {
  likeCount: number;
  profilePhoto: string;
  rank: number;
  username: string;
}

export const Ranking = (props: RankingProps) => {
  return (
    <Table.Tr>
      <Table.Th>{ordinal(props.rank)}</Table.Th>
      <Table.Td>
        <img src={props.profilePhoto} alt={props.username + '\'s profile photo'} />
        {props.username}
      </Table.Td>
      <Table.Td>{props.likeCount}</Table.Td>
    </Table.Tr>
  );
};
