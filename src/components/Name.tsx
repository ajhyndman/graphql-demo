import {DocumentNode, gql} from 'apollo-boost';
import {filter} from 'graphql-anywhere';
import React from 'react';

import {useApolloClient} from '@apollo/react-hooks';

import {QUERY} from '../App';

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
  const data = client.readQuery({query: QUERY});

  return filter(fragment, data.viewer);
};

const Name = ({id}: Props) => {
  const viewer = useFragment(id, VIEWER_FRAGMENT);
  console.log({viewer});

  return <p>You are authenticated as: {viewer?.name}</p>;
};

export default Name;
