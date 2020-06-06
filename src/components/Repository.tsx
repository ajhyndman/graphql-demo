import React from 'react';

import {useFragment} from '../util/useFragment';
import REPOSITORY_FRAGMENT from './RepositoryFragment.gql';

type Props = {
  id: string;
};

const Repository = ({id}: Props) => {
  const repository = useFragment({id, fragment: REPOSITORY_FRAGMENT});

  return <div>{repository.nameWithOwner}</div>;
};

export default Repository;
