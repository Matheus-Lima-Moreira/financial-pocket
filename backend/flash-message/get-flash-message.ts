"use server";

import { cookies } from "next/headers";
import { FlashMessageDTO } from "./dtos/flash-message.dto";

export async function getFlashMessage(): Promise<FlashMessageDTO | null> {
  const cks = await cookies();
  const flashMessage = cks.get("flash-message");
  
  if (flashMessage) {
    cks.delete("flash-message");
    return JSON.parse(flashMessage.value) as FlashMessageDTO;
  }
  
  return null;
}