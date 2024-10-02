import { Invoice } from './(components)';

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
      <Invoice id={id} />
    </div>
  );
}
