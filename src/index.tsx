import './index.css';

import ApolloClient, {InMemoryCache, IntrospectionFragmentMatcher} from 'apollo-boost';
// import {getIntrospectionQuery} from 'graphql';
import React from 'react';
import ReactDOM from 'react-dom';

import {ApolloProvider} from '@apollo/react-hooks';

import App from './App';
import introspectionQueryResult from './fragmentTypes.json';
import * as serviceWorker from './serviceWorker';

// const fragmentMatcherQuery = `
// {
//   __schema {
//     types {
//       kind
//       name
//       possibleTypes {
//         name
//       }
//     }
//   }
// }
// `;

// fetch('/graphql', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     Authorization: `bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
//   },
//   body: JSON.stringify({
//     query: getIntrospectionQuery({descriptions: true}),
//   }),
// })
//   .then((result) => result.json())
//   .then((result) => {
//     console.log(JSON.stringify(result));
//   });

const client = new ApolloClient({
  // @ts-ignore: third party type declaration isn't accurate
  fragmentMatcher: new IntrospectionFragmentMatcher({
    // @ts-ignore: type declaration doesn't quite match the real JSON
    introspectionQueryResultData: introspectionQueryResult.data,
  }),
  cache: new InMemoryCache({
    dataIdFromObject: (object) => object.id,
  }),
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
