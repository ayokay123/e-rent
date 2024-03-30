import useSWRMutation from 'swr/mutation';
import { fetcher } from '../../utils/fetcher';

const useAuthentication = () => {
  return useSWRMutation("/signin", fetcher.postAuth);
};

export { useAuthentication };
