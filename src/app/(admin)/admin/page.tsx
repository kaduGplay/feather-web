import {
  LastCustomers,
  LastInvoices,
  LastServices,
  LastTickets,
  Statistics,
} from './(components)';

export default function AdminPage() {
  return (
    <div>
      <Statistics />
      <LastCustomers />
      <LastServices />
      <LastInvoices />
      <LastTickets />
    </div>
  );
}
