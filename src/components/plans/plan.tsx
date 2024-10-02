import Link from 'next/link';
import Image from 'next/image';

import { IService } from '@src/interfaces';

import { PiCheckBold } from 'react-icons/pi';

export function Plan({ id, name, price, serviceLocation, features, discount }: IService) {
  return (
    <div className="relative bg-white dark:bg-black p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out w-full">
      {discount && (
        <div className="absolute top-0 right-0 bg-gradient-to-br from-gray-800 to-gray-600 text-white text-xs font-semibold uppercase rounded-full py-1 px-3 rotate-12 -translate-x-2 -translate-y-3">
          {discount}
        </div>
      )}
      <div className="flex items-center gap-4 mb-6">
        <Image
          src={serviceLocation.image}
          width={64}
          height={64}
          quality={100}
          alt={name}
          className="rounded-full border-4 border-gray-700 dark:border-gray-300 shadow-lg"
        />
        <div className="text-gray-900 dark:text-gray-100">
          <h1 className="text-2xl font-semibold mb-1">{name}</h1>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            {price.toLocaleString('pt-br', {
              currency: 'BRL',
              style: 'currency',
            })}
          </h2>
        </div>
      </div>
      <ul className="flex flex-col gap-3 mb-6 text-gray-700 dark:text-gray-300 font-medium">
        {JSON.parse(features).map((feature: string, index: number) => (
          <li key={index} className="flex items-center gap-2">
            <PiCheckBold size={20} className="text-gray-600 dark:text-gray-400" /> {feature}
          </li>
        ))}
      </ul>
      <div className="flex justify-center w-full">
        <Link
          href={`/checkout/${id}`}
          className="w-full flex items-center justify-center bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black font-bold text-lg py-3 px-6 rounded-md shadow-md transition-all duration-300 ease-in-out transform hover:translate-y-1"
          aria-label="Escolher"
        >
          Escolher
        </Link>
      </div>
    </div>
  );
}
