import {DocumentNode, gql} from 'apollo-boost';
import React from 'react';

import {useApolloClient} from '@apollo/react-hooks';

type Props = {
  id: string;
};

export const VIEWER_FRAGMENT = gql`
  fragment ViewerFragment on User {
    id
    login
    name
  }
`;

const useFragment = (id: string, fragment: DocumentNode) => {
  const client = useApolloClient();
  const typeName = fragment.definitions[0]?.typeCondition?.name?.value;
  return client.readFragment({id: `${typeName}:${id}`, fragment});
};

const Name = ({id}: Props) => {
  const viewer = useFragment(id, VIEWER_FRAGMENT);
  console.log({viewer});

  return <p>You are authenticated as: {viewer?.name}</p>;
};

export default Name;
