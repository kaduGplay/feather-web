import { LastInvoices, LastServices, LastTickets, Statistics } from './(components)';

export default function DashboardPage() {
  return (
    <div>
      <Statistics />
      <LastServices />
      <LastInvoices />
      <LastTickets />
    </div>
  );
}
