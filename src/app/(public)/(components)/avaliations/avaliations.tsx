import { Container } from '@src/components';

import { Avaliation } from '.';

export function Avaliations() {
  const avaliations = [
    {
      name: 'Yslower',
      avatar: 'https://images-ext-1.discordapp.net/external/QpM7pJnhuQDK50JMkMmeMDTm35YKqIXOmc523mrL7V8/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/822556773873352715/ef0d51b91f11e795179bc15a2db4ec63.png?format=webp&quality=lossless&width=472&height=472',
      date: new Date('2024-07-02'),
      description:
        'Até o momentos as hosts estão exelentes pra mim, tps bom, painel simples de mecher e o atendimento foi ótimo e super rapido.',
      stars: 5,
    },
    {
      name: 'alle__',
      avatar: 'https://images-ext-1.discordapp.net/external/Truz3s2vz73sIrvMhqWiiL03yAYhP7lfAXQ-Hmg7vdI/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1236372768061395007/097c4b51ac3dc8897087647aa52edb97.png?format=webp&quality=lossless&width=230&height=230',
      date: new Date('2024-07-24'),
      description:
        'muito bom, melhor atendimento que recebi da feather',
      stars: 5,
    },
    {
      name: 'White',
      avatar: 'https://images-ext-1.discordapp.net/external/V5Iq_He08XQZUUUIBQY_yAC_0TWV5cgi2fCEDQd98j4/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1027205251700363385/652f16ebbaa8134ec1cc1374a3d17bbe.png?format=webp&quality=lossless&width=359&height=359',
      date: new Date('2024-07-09'),
      description:
        'Melhor hospedagem impossível, fui super bem atendido e com uma qualidade excepcional! Recomendo demais quem procura preço e qualidade ao mesmo tempo!',
      stars: 5,
    },
  ];

  return (
    <div className="relative py-[50px] px-[50px] bg-transparent text-black dark:text-white mt-14">
      <div className="flex flex-col justify-center items-center text-center">
        <h1 className="text-[36px] text-black dark:text-white font-semibold">
          Está inseguro?
        </h1>
        <p className="lg:w-[600px] lg:text-[18px] font-light">
          Veja abaixo alguma das opiniões de nossos clientes!
        </p>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-[35px] mt-16">
        {avaliations.map((avaliation, index) => (
          <Avaliation key={index} {...avaliation} />
        ))}
      </div>
    </div>
  );
}
