"use client";

import { UserProfileDto } from "@/backend/user/dtos/user-profile-reply.dto";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "next/navigation";
import ProfileChangePasswordForm from "./profile-change-password-form";
import ProfilePersonalInfoForm from "./profile-personal-info-form";

type ProfileTabsProps = {
  profile: UserProfileDto;
  isEditing: boolean;
  onSave: () => void;
}

export default function ProfileTabs({ profile, isEditing, onSave }: ProfileTabsProps) {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const defaultTab = tabParam === "trocar-senha" ? "alterar-senha" : "informacoes-pessoais";

  return (
    <div className="px-0 pb-4">
      <Tabs defaultValue={defaultTab} className="w-full">
        <div className="w-full bg-gray-50 border-y border-zinc-300">
          <TabsList variant="line">
            <TabsTrigger className="cursor-pointer" value="informacoes-pessoais">
              Informações pessoais
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="alterar-senha">
              Alterar a senha
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="informacoes-pessoais" className="px-4 pt-4">
          <ProfilePersonalInfoForm profile={profile} isEditing={isEditing} onSave={onSave} />
        </TabsContent>

        <TabsContent value="alterar-senha" className="px-4 pt-4">
          <ProfileChangePasswordForm profile={profile} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

