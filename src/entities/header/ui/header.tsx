import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export const Header = () => {
  const { data: session, status } = useSession();

  return (
    <header className="bg-white shadow-md mx-auto max-w-5xl mb-5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            EventsApp
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {status === "authenticated" ? (
            <>
              <span className="text-sm font-medium text-gray-900">
                {session.user?.name}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-gray-500 hover:text-gray-700 text-sm font-semibold"
              >
                ←
              </button>
              <Link
                href="/events/create"
                className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500"
              >
                Создать событие
              </Link>
            </>
          ) : (
            <Link
              href="/auth/signin"
              className="text-sm font-semibold text-gray-900 hover:text-gray-700"
            >
              Войти →
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
