import {DocumentNode} from 'apollo-boost';
import {useContext, useEffect} from 'react';

// import invariant from 'ts-invariant';
import {useApolloClient} from '@apollo/react-hooks';

import {FragmentContext} from './Query';

export const useFragment = ({
  fragment,
  id,
  fragmentName,
}: {
  fragment: DocumentNode;
  id: string;
  fragmentName?: string;
}) => {
  const {setFragments} = useContext(FragmentContext);
  useEffect(() => {
    setFragments((fragments) => {
      fragments.add(fragment);
      return fragments;
    });
    return () => {
      setFragments((fragments) => {
        fragments.delete(fragment);
        return fragments;
      });
    };
  }, [fragment, setFragments]);

  const client = useApolloClient();
  // let definition;
  // if (fragmentName != null) {
  //   definition = fragment.definitions.find(
  //     // @ts-ignore: Third party types for Document definitions are imprecise
  //     (definition) => definition?.name?.value === fragmentName
  //   );
  //   invariant(
  //     definition?.kind === 'FragmentDefinition',
  //     `Could not find a fragment matching name: ${fragmentName}`
  //   );
  // } else {
  //   definition = fragment.definitions[0];
  //   invariant(
  //     definition?.kind === 'FragmentDefinition',
  //     `No fragmentName was supplied, so we looked at the first definition, but it was a ${definition?.kind}, not a FragmentDefinition`
  //   );
  // }
  // // @ts-ignore: Third party types for Document definitions are imprecise
  // const typeName = definition?.typeCondition?.name?.value;
  return client.readFragment({id, fragment, fragmentName});
};
