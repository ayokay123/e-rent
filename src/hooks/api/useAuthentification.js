import useSWRMutation from 'swr/mutation';

const useAuthentication = () => {
  return useSWRMutation("/signin", fetcher.post);
};

export { useAuthentication };
