import { Metadata } from "next";
import { PublicHeader } from "./_components/public-header";
import { getSession } from "@/backend/session/helpers/get-session.helper";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Início",
};

export default async function Home() {
  const hasSession = await getSession();

  if (hasSession) {
    return redirect("/dashboard");
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-zinc-300 font-sans dark:bg-black">
      {/* Header público */}
      <PublicHeader />
    </div>
  );
}
