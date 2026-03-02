"use client";

import { userProfileAction } from "@/backend/user/actions/user-profile.action";
import { UserProfileDto } from "@/backend/user/dtos/user-profile-reply.dto";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext<{ profile: UserProfileDto | undefined }>({ profile: undefined });

export function AuthProvider({ children }: { children: React.ReactNode }) {

  const [profile, setProfile] = useState<UserProfileDto | undefined>(undefined);

  async function loadSession() {
    const result = await userProfileAction();

    setProfile(result.data as UserProfileDto);
  }

  useEffect(() => {
    loadSession();
  }, []);

  return (
    <AuthContext.Provider value={{ profile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}