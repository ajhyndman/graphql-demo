import './App.css';

import {gql} from 'apollo-boost';
import React from 'react';

import {useQuery} from '@apollo/react-hooks';

import Name, {VIEWER_FRAGMENT} from './components/Name';
import logo from './logo.svg';

export const QUERY = gql`
  query {
    viewer {
      id
      ...ViewerFragment
    }
  }
  ${VIEWER_FRAGMENT}
`;

function App() {
  const {data, loading} = useQuery(QUERY);

  const id = data?.viewer?.id;

  if (loading) {
    return <>loading...</>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Name id={id} />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
