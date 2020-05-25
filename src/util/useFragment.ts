import {DocumentNode} from 'apollo-boost';

// import invariant from 'ts-invariant';
import {useApolloClient} from '@apollo/react-hooks';

export const useFragment = ({
  fragment,
  id,
  fragmentName,
}: {
  fragment: DocumentNode;
  id: string;
  fragmentName?: string;
}) => {
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
