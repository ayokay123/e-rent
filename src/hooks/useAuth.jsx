import { set } from "date-fns";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext(
  {}
);

// Export the provider as we need to wrap the entire app with it
export function AuthProvider({
  children,
}) {
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const { setItem, removeItem, getItem } = useLocalStorage();

  // We are using `react-router` for this example,
  // but feel free to omit this or use the
  // router of your choice.
  useEffect(() => {
    setUser(getItem("user"));
  }, [])

  // Reset the error state if we change page
  useEffect(() => {
    if (error) setError(undefined);
  }, [location.pathname]);

  function login(email, password,id) {
    setLoading(true);

    setUser({ email, password, id });
    setItem("user", JSON.stringify({ email, password, id }));
    // sessionsApi.login({ email, password })
    //   .then((user) => {
    //     setUser(user);
    //     history.push("/");
    //   })
    //   .catch((error) => setError(error))
    //   .finally(() => setLoading(false));
  }

  function logout() {
    setUser(undefined);
    removeItem("user");
  }

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      logout,
    }),
    [user, loading, error]
  );

  console.log(memoedValue)

  // We only want to render the underlying app after we
  // assert for the presence of a current user.
  return (
    <AuthContext.Provider value={memoedValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context component.
export default function useAuth() {
  return useContext(AuthContext);
}
