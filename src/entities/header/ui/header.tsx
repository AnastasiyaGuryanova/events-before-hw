import Link from "next/link";

export const Header = () => {
  return (
    <header className="bg-white shadow-md mx-auto max-w-5xl mb-5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            EventsApp
          </Link>
        </div>

        <div>
          <Link
            href="/events/create"
            className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Создать событие
          </Link>
        </div>
      </div>
    </header>
  );
};
