import { ServiceLocation } from './(components)';

export default function AdminPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;

  return (
    <>
      <div>
        <ServiceLocation id={id} />
      </div>
    </>
  );
}