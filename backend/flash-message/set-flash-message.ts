"use server";

import { cookies } from "next/headers";
import { FlashMessageDTO } from "./dtos/flash-message.dto";

export async function setFlashMessage(message: FlashMessageDTO) {
  const cks = await cookies();
  cks.set("flash-message", JSON.stringify(message));
}