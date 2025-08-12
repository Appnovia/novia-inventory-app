import { useQueryClient } from "@tanstack/react-query";
import React, { createContext, useContext, useEffect, useState } from "react";
import { storage } from "./storage";

export const SESSION_KEY = "session";

export interface Session {
  token: string;
  user: {
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    emailVerified: string | null;
    image: string | null;
    jobTitle: string | null;
    status: boolean;
    orgName: string;
    orgId: string;
    locationId: string | null;
    isVerfied: boolean;
    token: string; // OTP or email token?
    createdAt: string;
    updatedAt: string;
    roleId: string | null;
    roles: {
      id: string;
      displayName: string;
      roleName: string;
      orgId: string;
      description: string;
      permissions: string[];
      createdAt: string;
      updatedAt: string;
    }[];
    organisation: {
      id: string;
      name: string;
      slug: string;
      country: string;
      address: string;
      currency: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}

type AuthState = {
  session: Session | null;
  setSession: (session: Session) => void;
  getSession: () => Promise<Session | null>;
  removeSession: () => void;
  user: any | null;
};

const AuthContext = createContext<AuthState>({
  session: null,
  setSession: () => {},
  getSession: async () => null,
  removeSession: () => {},
  user: null,
});

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = useQueryClient();
  const [session, setSessionState] = useState<Session | null>(null);
  const [user, setUser] = useState<any | null>(null);

  const setSession = (session: Session) => {
    storage.setItem(SESSION_KEY, JSON.stringify(session));
    setSessionState(session);
  };

  const getSession = async (): Promise<Session | null> => {
    const sessionStr = await storage.getItem(SESSION_KEY);
    if (!sessionStr) return null;
    const parsed: Session = JSON.parse(sessionStr);
    setSessionState(parsed);
    return parsed;
  };

  const removeSession = () => {
    storage.deleteItem(SESSION_KEY);
    queryClient.clear();
    setSessionState(null);
  };

  useEffect(() => {
    getSession().then((session) => {
      setUser(session?.user);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        setSession,
        getSession,
        removeSession,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
