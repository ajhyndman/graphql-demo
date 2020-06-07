import './App.css';

import React, {useState} from 'react';

import {useQuery} from '@apollo/react-hooks';

import QUERY from './App.graphql';
import Name from './components/Name';
import Repository from './components/Repository';
import {useQueryVariables} from './util/useQueryVariables';

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
      <label>
        Search for a repository:{' '}
        <input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
        />
      </label>

      <div>Matches: {data.search.repositoryCount}</div>
      {data.search.edges.map((edge: any) => {
        return <Repository key={id} id={edge.node.id} />;
      })}
    </div>
  );
}

export default App;
