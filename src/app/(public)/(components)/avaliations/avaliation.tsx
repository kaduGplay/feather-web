import { format } from 'date-fns';
import Image from 'next/image';
import { IoStarSharp } from 'react-icons/io5';

export function Avaliation({
  name,
  avatar,
  date,
  description,
  stars,
}: {
  name: string;
  avatar: string;
  date: Date;
  description: string;
  stars: number;
}) {
  return (
    <div className="bg-white dark:bg-[#070808] rounded-md py-[15px] px-[25px] min-h-52">
      <div className="flex items-center gap-3">
        <Image src={avatar} width={40} height={40} quality={100} alt="Avaliação" className='rounded-full' />
        <div>
          <h1 className="text-[14px] font-semibold">{name}</h1>
          <p className="text-[12px] text-black/70 dark:text-white/70 font-light">
            Avaliado em {format(new Date(date), 'dd/MM/yyyy')}
          </p>
        </div>
      </div>
      <p className="text-[14px] my-5 text-black/70 dark:text-white/70 font-light">{description}</p>
      <div className="flex items-center gap-[1px] absolute bottom-16">
        {Array.from({ length: 5 }, (_, index) => index + 1).map(index => (
          <IoStarSharp
            key={index}
            className="text-yellow-400"
            size={20}
            style={{ opacity: index <= stars ? 1 : 0.2 }}
          />
        ))}
      </div>
    </div>
  );
}
