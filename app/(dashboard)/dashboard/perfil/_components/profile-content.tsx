"use client";

import { UserProfileDto } from "@/backend/user/dtos/user-profile-reply.dto";
import { createContext, useContext, useState } from "react";
import ProfileTabs from "./profile-tabs";

type ProfileContextType = {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

export const ProfileContext = createContext<ProfileContextType>({
  isEditing: false,
  setIsEditing: () => { },
});

export function useProfileContext() {
  return useContext(ProfileContext);
}

type ProfileContentProps = {
  profile: UserProfileDto;
}

export default function ProfileContent({ profile }: ProfileContentProps) {
  const [isEditing, setIsEditing] = useState(false);

  function handleSave() {
    setIsEditing(false);
  }

  return (
    <ProfileContext.Provider value={{ isEditing, setIsEditing }}>
      <ProfileTabs profile={profile} isEditing={isEditing} onSave={handleSave} />
    </ProfileContext.Provider>
  );
}

