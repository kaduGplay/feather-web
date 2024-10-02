import { Customer } from './(components)';

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
        <Customer id={id} />
      </div>
    </>
  );
}
