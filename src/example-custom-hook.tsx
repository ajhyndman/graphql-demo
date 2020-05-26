import {gql} from 'apollo-boost';
import {DocumentNode} from 'graphql';
import React, {Context, createContext, useContext, useState} from 'react';
import {render} from 'react-dom';

import {useApolloClient, useQuery} from '@apollo/react-hooks';

declare const useProvider: <T>(context: Context<T>, value?: T) => void;

const FragmentContext = createContext({
  fragments: [] as DocumentNode[],
  setFragments: (update: (fragments: DocumentNode[]) => DocumentNode[]) => {},
});

const useQueryWithFragments = (query: DocumentNode, options?: any) => {
  const [fragments, setFragments] = useState([] as DocumentNode[]);
  useProvider(FragmentContext, {fragments, setFragments});

  const stitchedQuery = {
    ...query,
    definitions: [
      ...query.definitions,
      ...fragments.map((fragment) => fragment.definitions).flat(),
    ],
  };

  return useQuery(stitchedQuery, options);
};

const useFragment = (id: string, fragment: DocumentNode) => {
  const {setFragments} = useContext(FragmentContext);
  setFragments((fragments) => [...fragments, fragment]);

  const client = useApolloClient();
  return client.readFragment({id, fragment});
};

const App = () => {
  const {data} = useQueryWithFragments(gql`
    query {
      id
      ...ChildFragment
    }
  `);

  if (data == null) return <>loading...</>;

  return <Child id={data.id} />;
};

const Child = ({id}: {id: string}) => {
  const {data} = useFragment(
    id,
    gql`
      fragment ChildFragment on Query {
        viewer {
          id
          name
        }
      }
    `
  );

  return <p>Name: {data.name}</p>;
};

render(<App />, document.getElementById('app'));
