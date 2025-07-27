import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trpc } from "@/shared/api";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Link from "next/link";

const RegisterSchema = z.object({
  name: z.string().min(1, "Имя обязательно"),
  email: z.string().email("Некорректный email"),
  password: z.string().min(4, "Пароль должен быть минимум 6 символов"),
});

type RegisterSchema = z.infer<typeof RegisterSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { mutate, error } = trpc.auth.register.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: RegisterSchema) => {
    mutate(data, {
      onSuccess: async () => {
        const signInResult = await signIn("credentials", {
          redirect: false,
          email: data.email,
          password: data.password,
        });

        if (signInResult?.ok) {
          router.push("/");
        } else {
          console.error("Ошибка автоматического входа:", signInResult?.error);
          router.push("/auth/signin");
        }
      },
    });
  };

  return (
    <div className="mx-auto max-w-md px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-900">Регистрация</h2>
      {error && <p className="text-red-500 mt-2">{error.message}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Имя
          </label>
          <input
            id="name"
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Пароль
          </label>
          <input
            id="password"
            type="password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            {...register("password")}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            Зарегистрироваться
          </button>
        </div>
      </form>

      <p className="mt-2 text-sm text-gray-600">
        Уже есть аккаунт?{" "}
        <Link
          href="/auth/signin"
          className="text-indigo-600 hover:text-indigo-500"
        >
          Авторизоваться
        </Link>
      </p>
    </div>
  );
}
