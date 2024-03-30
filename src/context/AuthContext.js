import { createContext } from "react";

// interface AuthContext {
//   user: User | null;
//   setUser: (user: User | null) => void;
// }

export const AuthContext = createContext({
  user: null,
  setUser: () => {},
});