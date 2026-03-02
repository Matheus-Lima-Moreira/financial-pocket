import emptyNotification from "@/images/empty-notification.svg";
import Image from "next/image";

type Props = {
  message?: string;
}

export function EmptyNotification({ message }: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-0 py-10">
      <Image src={emptyNotification} alt="Empty" width={160} height={160} />
      {message && <p className="text-sm text-gray-500">{message}</p>}
    </div>
  );
}