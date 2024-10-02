import Link from 'next/link';

export function Blog({
  icon,
  name,
  description,
  link,
}: {
  icon: React.ReactNode;
  name: string;
  description: string;
  link: string;
}) {
  return (
    <Link
      href={link}
      target="_blank"
      className="w-full flex flex-col gap-2 bg-black dark:bg-white text-white dark:text-black p-[20px] rounded-[12px]"
    >
      <div className="bg-white dark:bg-black p-[10px] rounded-full w-fit">{icon}</div>
      <h1 className="text-[18px] font-semibold">{name}</h1>
      <p className="text-[14px] xl:text-[16px] text-[#BFBFBF]">{description}</p>
    </Link>
  );
}
