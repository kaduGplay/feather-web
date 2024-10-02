import { Coupon } from './(components)';

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
        <Coupon id={id} />
      </div>
    </>
  );
}
