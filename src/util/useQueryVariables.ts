import debounce from 'lodash.debounce';
import {useCallback, useEffect, useState} from 'react';

/**
 * Manage query variables with a debounce.
 *
 * @param nextVariables
 */
export const useQueryVariables = (nextVariables: {[key: string]: any}, timeout: number = 1000) => {
  const [variables, setVariables] = useState(nextVariables);
  const debouncedSetVariables = useCallback(
    debounce((variables: {[key: string]: any}) => {
      setVariables(variables);
    }, timeout),
    []
  );
  useEffect(() => {
    debouncedSetVariables(nextVariables);
  }, [debouncedSetVariables, nextVariables]);

  return variables;
};
