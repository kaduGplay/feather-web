import { Ticket } from './(components)';

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
      <Ticket id={id} />
    </div>
  );
}
