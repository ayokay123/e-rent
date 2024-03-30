import useSWRMutation from 'swr/mutation';

const useAuthentication = () => {
  return useSWRMutation(isAuthorized ? key : null, fetcher.post);
};

export { useAuthentication };
