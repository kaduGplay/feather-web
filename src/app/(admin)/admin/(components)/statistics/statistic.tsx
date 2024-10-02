export function Statistic({
  icon,
  name,
  value,
  gain,
}: {
  icon: React.ReactNode;
  name: string;
  value: number;
  gain?: boolean;
}) {
  return (
    <div className="bg-gray-200 dark:bg-dark-100 flex flex-col gap-0 rounded-md px-5 py-3">
      <div className="bg-dark-100 dark:bg-light-100 w-fit rounded-full p-2 mb-4">{icon}</div>
      <h2 className="text-[14px] text-gray-500 dark:text-gray-100 font-light">{name}</h2>
      <h1 className="text-[25px] text-black dark:text-white font-semibold">
        {gain
          ? value.toLocaleString('pt-br', {
              currency: 'BRL',
              style: 'currency',
            })
          : value}
      </h1>
    </div>
  );
}