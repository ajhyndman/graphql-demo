import {gql} from 'apollo-boost';
import React from 'react';

import {useFragment} from '../util/useFragment';

type Props = {
  id: string;
};

export const REPOSITORY_FRAGMENT = gql`
  fragment RepositoryFragment on Repository {
    id
    nameWithOwner
  }
`;

const Repository = ({id}: Props) => {
  const repository = useFragment({id, fragment: REPOSITORY_FRAGMENT});

  return <div>{repository.nameWithOwner}</div>;
};

export default Repository;
