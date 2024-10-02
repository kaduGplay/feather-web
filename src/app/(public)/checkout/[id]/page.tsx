import { Metadata } from 'next';

import { Checkout } from './(components)';

export const metadata: Metadata = {
  title: 'Checkout | FeatherHost',
  twitter: {
    title: 'Checkout | FeatherHost',
  },
};

export default function CheckoutPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;

  return (
    <div>
      <Checkout id={id} />
    </div>
  );
}
