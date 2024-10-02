import Image from 'next/image';

import { IService } from '@src/interfaces';

import { PiCheckBold } from 'react-icons/pi';

export function Plan({ id, name, price, serviceLocation, features, discount }: IService) {
  return (
    <div className="relative bg-black dark:bg-white p-[20px] rounded-[49px] w-full">
      {discount && (
        <div className="absolute top-0 right-0 bg-white dark:bg-black text-[11px] font-semibold text-black dark:text-white rounded-full py-[5px] px-[10px] rotate-12 -translate-x-2 -translate-y-3">
          {discount}
        </div>
      )}
      <div className="flex items-center gap-3">
        <Image
          src={serviceLocation.image}
          width={58}
          height={58}
          quality={100}
          alt={name}
        />
        <div className="text-white dark:text-black">
          <h1 className="text-[18px] font-semibold">{name}</h1>
          <h2 className="text-[18px] font-semibold">
            {price.toLocaleString('pt-br', {
              currency: 'BRL',
              style: 'currency',
            })}
          </h2>
        </div>
      </div>
      <ul className="flex flex-col gap-[12px] py-[30px] text-[14px] text-white dark:text-black font-medium">
        {JSON.parse(features).map((feature: string, index: number) => (
          <li key={index} className="flex items-center gap-2">
            <PiCheckBold size={18} /> {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
