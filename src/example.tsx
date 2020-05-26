import React, {Context, createContext, useContext} from 'react';
import {render} from 'react-dom';

declare const useProvider: <T>(context: Context<T>, value?: T) => void;

const ThemeContext = createContext('light');

const App = () => {
  useProvider(ThemeContext, 'dark');

  return <Child />;
};

const Child = () => {
  const theme = useContext(ThemeContext);

  return <p>Current theme: {theme}</p>;
};

render(<App />, document.getElementById('app'));
