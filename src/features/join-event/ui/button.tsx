import { trpc } from "@/shared/api";

type JoinEventButtonProps = {
  eventId: number;
  onSuccess?: () => void;
};

export const JoinEventButton = ({
  eventId,
  onSuccess,
}: JoinEventButtonProps) => {
  const { mutate } = trpc.event.join.useMutation({ onSuccess });

  const handleClick = () => {
    mutate({ id: eventId });
  };

  return (
    <button
      className="h-10 px-6 font-semibold rounded-md bg-black text-white"
      onClick={handleClick}
    >
      Присоединиться
    </button>
  );
};
