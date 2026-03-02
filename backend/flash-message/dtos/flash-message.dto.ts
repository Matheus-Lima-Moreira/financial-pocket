import { FlashMessageType } from "../enum/flash-message-type.enum";

export type FlashMessageDTO = {
  title: string;
  description?: string;
  type: FlashMessageType;
}