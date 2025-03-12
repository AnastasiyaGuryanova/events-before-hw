import { CreateEventForm } from "@/features/create-event";
import { CreateEventSchema, trpc } from "@/shared/api";
import { useRouter } from "next/router";

export default function CreateEvent() {
  const router = useRouter();

  const { mutate } = trpc.event.create.useMutation({
    onSuccess: (data) => {
      router.push(`/events/${data.id}`);
    },
  });

  const handleSubmit = (data: CreateEventSchema) => {
    mutate(data);
  };

  return <CreateEventForm onSubmit={handleSubmit} />;
}
