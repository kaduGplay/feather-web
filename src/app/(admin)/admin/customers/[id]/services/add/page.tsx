import { AddService } from './(components)';

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
        <AddService id={id} />
      </div>
    </>
  );
}
