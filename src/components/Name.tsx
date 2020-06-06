import React from 'react';

import {useFragment} from '../util/useFragment';
import NAME_FRAGMENT from './NameFragment.gql';

type Props = {
  id: string;
};

const Name = ({id}: Props) => {
  const viewer = useFragment({id, fragment: NAME_FRAGMENT});

  return <p>You are authenticated as: {viewer?.name}</p>;
};

export default Name;
