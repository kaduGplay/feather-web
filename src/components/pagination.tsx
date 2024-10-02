import Link from 'next/link';

export function Pagination({
  page,
  pathname,
}: {
  page: string | number;
  pathname: string;
}) {
  return (
    <div className="bg-white dark:bg-black rounded-md p-1 mt-5">
      <nav aria-label="Paginação">
        <ul className="flex justify-between items-center list-style-none">
          <li>
            <Link href={pathname + `?page=${Number(page) - 1}`}>
              <button
                className="relative block bg-transparent px-3 py-1.5 text-sm md:text-md rounded-full transition-all duration-300 text-black hover:text-white dark:text-white bg-black hover:bg-black dark:hover:bg-white dark:hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={Number(page) === 1}
              >
                Anterior
              </button>
            </Link>
          </li>
          <li aria-current="page">
            <Link
              className="relative block bg-transparent border border-black dark:border-white text-black dark:text-white rounded-full px-2 py-0.5 text-sm md:text-md font-medium transition-all duration-300"
              href="#!"
            >
              {Number(page)}
              <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">
                (ativo)
              </span>
            </Link>
          </li>
          <li>
            <Link href={pathname + `?page=${Number(page) + 1}`}>
              <button
                className="relative block bg-transparent px-3 py-1.5 text-sm md:text-md rounded-full transition-all duration-300 text-black hover:text-white dark:text-white bg-black hover:bg-black dark:hover:bg-white dark:hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                // disabled={games.length < 9 ? true : false}
              >
                Próxima
              </button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
