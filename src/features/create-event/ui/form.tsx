import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateEventSchema } from "@/shared/api";

type CreateEventFormProps = {
  onSubmit: (data: CreateEventSchema) => void;
};

export const CreateEventForm = ({ onSubmit }: CreateEventFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateEventSchema>({
    resolver: zodResolver(CreateEventSchema),
    mode: "onChange",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-12">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Событие
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Заполните форму для создания события
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Название
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="title"
                  autoComplete="title"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("title")}
                />
              </div>
              {errors.title && (
                <p className="mt-3 text-sm leading-6 text-red-500">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Описание
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("description")}
                />
              </div>
              {errors.description ? (
                <p className="mt-3 text-sm leading-6 text-red-500">
                  {errors.description.message}
                </p>
              ) : (
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Напишите несколько предложений о предстоящем мероприятии
                </p>
              )}
            </div>

            <div className="col-span-full">
              <label
                htmlFor="date"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Дата проведения
              </label>
              <div className="mt-2">
                <input
                  id="date"
                  type="date"
                  className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("date")}
                />
              </div>
              {errors.date && (
                <p className="mt-3 text-sm leading-6 text-red-500">
                  {errors.date.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Отмена
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Создать
        </button>
      </div>
    </form>
  );
};
