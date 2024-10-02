export function Benefit({
  icon,
  name,
  children,
}: {
  icon: React.ReactNode;
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-transparent dark:shadow-white/15 shadow-[0px_8px_28px_-9px_rgba(0,0,0,0.45)] relative w-[400px] h-[230px] rounded-[16px] overflow-hidden transition-all ease-in-out duration-300 hover:shadow-lg playing">
      <div className='relative p-5'>
        <div className='flex items-center'>
          <div className='bg-black dark:bg-white w-fit rounded-full p-1'>{icon}</div>
          <h1 className='ml-2 text-xl text-black dark:text-white'>{name}</h1>
        </div>
        <p className='text-sm font-light text-black dark:text-white p-2 mt-1'>{children}</p>
      </div>
    </div>
  );
}
