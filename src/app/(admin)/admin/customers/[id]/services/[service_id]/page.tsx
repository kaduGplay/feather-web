import { Service } from './(components)';

export default function AdminPage({
  params,
}: {
  params: {
    id: string;
    service_id: string;
  };
}) {
  const { id, service_id } = params;

  return (
    <>
      <div>
        <Service customer_id={id} id={service_id} />
      </div>
    </>
  );
}
