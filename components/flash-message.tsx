"use client";

import { FlashMessageDTO } from "@/backend/flash-message/dtos/flash-message.dto";
import { getFlashMessage } from "@/backend/flash-message/get-flash-message";
import { CircleCheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "./ui/alert";

export function FlashMessage() {
  const [flashMessage, setFlashMessage] = useState<FlashMessageDTO | null>(null);


  useEffect(() => {
    const loadFlashMessage = async () => {
      const flashMessage = await getFlashMessage();
      if (flashMessage) {
        setFlashMessage(flashMessage);

        setTimeout(() => {
          setFlashMessage(null);
        }, 3000);
      }
    };

    loadFlashMessage();
  }, []);


  if (!flashMessage) {
    return null;
  }

  return (
    <Alert variant="success">
      <CircleCheckIcon />
      <AlertDescription className="font-bold">
        {flashMessage.title + " " + flashMessage.description}
      </AlertDescription>
    </Alert>
  );
}