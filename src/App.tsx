import './App.css';

import React, {useEffect, useState} from 'react';

import logo from './logo.svg';

const query = `
  query {
    viewer {
      login
      name
    }
  }
`;

const fetchName = async () => {
  const response = await fetch('/graphql', {
    method: 'POST',
    body: JSON.stringify({
      query,
    }),
    headers: {
      Authorization: `bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
    },
  });
  const {data} = await response.json();
  return data.viewer.name;
};

function App() {
  const [name, setName] = useState('');

  useEffect(() => {
    const updateName = async () => {
      const name = await fetchName();
      setName(name);
    };
    updateName();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>You are authenticated as: {name}</p>
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
