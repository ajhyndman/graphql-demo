import React, {Context, createContext, useContext, useState} from 'react';
import {render} from 'react-dom';

declare const useProvider: <T>(context: Context<T>, value?: T) => void;

const ThemeContext = createContext({theme: 'light', setTheme: (theme: string) => {}});

const App = () => {
  const [theme, setTheme] = useState('light');
  useProvider(ThemeContext, {theme, setTheme});

  return <Child />;
};

const Child = () => {
  const {theme} = useContext(ThemeContext);

  return <p>Current theme: {theme}</p>;
};

render(<App />, document.getElementById('app'));
