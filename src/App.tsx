import './App.css';

import {gql} from 'apollo-boost';
import React, {useState} from 'react';

import {useQuery} from '@apollo/react-hooks';

import Name, {VIEWER_FRAGMENT} from './components/Name';
import {useQueryVariables} from './util/useQueryVariables';

export const QUERY = gql`
  query SearchQuery($query: String!) {
    viewer {
      id
      ...ViewerFragment
    }

    search(query: $query, type: REPOSITORY, first: 10) {
      edges {
        node {
          ... on Repository {
            id
            nameWithOwner
          }
        }
      }
      repositoryCount
    }
  }

  # Fragment declarations here:
  ${VIEWER_FRAGMENT}
`;

function App() {
  const [query, setQuery] = useState('');

  const variables = useQueryVariables({query});
  const {data} = useQuery(QUERY, {variables});

  const id = data?.viewer?.id;

  if (data == null) {
    return <>loading...</>;
  }

  return (
    <div className="App">
      <Name id={id} />
      <input
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      />

      <div>{data.search.repositoryCount}</div>
      {data.search.edges.map((edge: any) => {
        return <div>{edge.node.nameWithOwner}</div>;
      })}
    </div>
  );
}

export default App;
