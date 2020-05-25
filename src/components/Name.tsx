import {gql} from 'apollo-boost';
import React from 'react';

import {useFragment} from '../util/useFragment';

type Props = {
  id: string;
};

export const VIEWER_FRAGMENT = gql`
  fragment ViewerFragment on User {
    name
  }
`;

const Name = ({id}: Props) => {
  const viewer = useFragment({id, fragment: VIEWER_FRAGMENT});

  return <p>You are authenticated as: {viewer?.name}</p>;
};

export default Name;
