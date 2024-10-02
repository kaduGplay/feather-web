import { Blog } from '.';

import {
  PiArchiveFill,
  PiCloudFill,
  PiDiscordLogoFill,
  PiFolderFill,
  PiListFill,
  PiShieldFill,
} from 'react-icons/pi';

export function Blogs() {
  const items = [
    {
      icon: <PiFolderFill className="text-black dark:text-white" size={32} />,
      name: 'Duvidas sobre servidor',
      description: 'Tire suas duvidas sobre servidor de minecraft ou outros.',
      link: '/',
    },
    {
      icon: <PiListFill className="text-black dark:text-white" size={32} />,
      name: 'Duvidas sobre servidor',
      description: 'Tiree suas duvidas sobre servidor de minecraft ou outros.',
      link: '/',
    },
    {
      icon: <PiShieldFill className="text-black dark:text-white" size={32} />,
      name: 'Duvidas sobre servidor',
      description: 'Tire suas duvidas sobre servidor de minecraft ou outros.',
      link: '/',
    },
    {
      icon: <PiCloudFill className="text-black dark:text-white" size={32} />,
      name: 'Duvidas sobre servidor',
      description: 'Tire suas duvidas sobre servidor de minecraft ou outros.',
      link: '/',
    },
    {
      icon: <PiDiscordLogoFill className="text-black dark:text-white" size={32} />,
      name: 'Duvidas sobre servidor',
      description: 'Tire suas duvidas sobre servidor de minecraft ou outros.',
      link: '/',
    },
    {
      icon: <PiArchiveFill className="text-black dark:text-white" size={32} />,
      name: 'Duvidas sobre servidor',
      description: 'Tire suas duvidas sobre servidor de minecraft ou outros.',
      link: '/',
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[50px]">
      {items.map((item, index) => (
        <Blog key={index} {...item} />
      ))}
    </div>
  );
}
