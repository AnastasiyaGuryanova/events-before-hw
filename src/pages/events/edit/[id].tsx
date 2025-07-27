import { trpc } from "@/shared/api";
import { EditEventForm } from "@/features/edit-event";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function EditEventPage() {
  const router = useRouter();
  const session = useSession();
  const { id } = router.query;

  const {
    data: event,
    isLoading,
    error,
  } = trpc.event.findUnique.useQuery({ id: Number(id) }, { enabled: !!id });

  const { mutate } = trpc.event.update.useMutation({
    onSuccess: () => router.push(`/events/${id}`),
  });

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error.message}</div>;
  if (!event) return <div>Событие не найдено</div>;

  if (session.status === "unauthenticated") return <div>Доступ запрещен</div>;
  if (event.authorId !== session.data?.user?.id)
    return <div>Вы не автор этого события</div>;

  const handleSubmit = (data: any) => {
    mutate({ ...data, id: Number(id) });
  };

  const formEvent = {
    id: Number(id),
    title: event.title,
    description: event.description ?? undefined,
    date: event.date,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <EditEventForm event={formEvent} onSubmit={handleSubmit} />
    </div>
  );
}
