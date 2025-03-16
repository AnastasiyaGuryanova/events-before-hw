import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

const SignInSchema = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string().min(4, "Пароль должен быть минимум 6 символов"),
});

type SignInSchema = z.infer<typeof SignInSchema>;

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(SignInSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: SignInSchema) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      setError("Неверный email или пароль");
    } else if (result?.ok) {
      router.push("/");
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-900">Вход</h2>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
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
            Войти
          </button>
        </div>
      </form>
      <p className="mt-2 text-sm text-gray-600">
        Нет аккаунта?{" "}
        <Link
          href="/auth/register"
          className="text-indigo-600 hover:text-indigo-500"
        >
          Зарегистрироваться
        </Link>
      </p>
    </div>
  );
}
