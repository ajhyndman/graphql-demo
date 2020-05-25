import debounce from 'lodash.debounce';
import {useCallback, useEffect, useState} from 'react';

/**
 * Manage query variables with a one second debounce.
 *
 * @param nextVariables
 */
export const useQueryVariables = (nextVariables: {[key: string]: any}) => {
  const [variables, setVariables] = useState(nextVariables);
  const debouncedSetVariables = useCallback(
    debounce((variables: {[key: string]: any}) => {
      setVariables(variables);
    }, 1000),
    []
  );
  useEffect(() => {
    debouncedSetVariables(nextVariables);
  }, [debouncedSetVariables, nextVariables]);

  return variables;
};
