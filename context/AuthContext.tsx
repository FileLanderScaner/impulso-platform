import React, { createContext, useContext } from "react";
import { useSession } from "next-auth/react";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  return (
    <AuthContext.Provider value={{ user: session?.user, status }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
