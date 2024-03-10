import type { UserType } from "@/types/user";
import { useState } from "react";
import AuthContext from "./context";

export type AuthWrapperProps = {
  children: React.ReactNode;
};
function AuthWrapper({ children }: AuthWrapperProps) {
  const [user, setUser] = useState<UserType | null>(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthWrapper;
