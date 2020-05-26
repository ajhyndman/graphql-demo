import {DocumentNode} from 'graphql';
import React, {createContext, ReactNode, useState} from 'react';

import {useQuery} from '@apollo/react-hooks';

type Props = {children: (result: any) => ReactNode; query: DocumentNode; options?: any};

type FragmentContextValue = {
  fragments: Set<DocumentNode>;
  setFragments: (update: (fragments: Set<DocumentNode>) => Set<DocumentNode>) => void;
};

export const FragmentContext = createContext<FragmentContextValue>({
  fragments: new Set(),
  setFragments: () => [],
});

const Query = ({children, query, options}: Props) => {
  const [fragments, setFragments] = useState(new Set() as Set<DocumentNode>);

  const stitchedQuery = {
    ...query,
    definitions: [
      ...query.definitions,
      ...[...fragments].map((fragment) => fragment.definitions).flat(),
    ],
  };
  const result = useQuery(stitchedQuery, options);
  return (
    <FragmentContext.Provider
      value={{
        fragments,
        setFragments,
      }}
    >
      {children(result)}
    </FragmentContext.Provider>
  );
};

export default Query;
