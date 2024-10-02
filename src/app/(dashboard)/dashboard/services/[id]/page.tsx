import { Service } from './(components)';

export default function DashboardPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;

  return (
    <div>
      <Service id={id} />
    </div>
  );
}
