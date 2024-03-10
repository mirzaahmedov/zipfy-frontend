import type { UserType } from "@/types/user";
import { createContext } from "react";

export type AuthContextType = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => null,
});

export default AuthContext;
