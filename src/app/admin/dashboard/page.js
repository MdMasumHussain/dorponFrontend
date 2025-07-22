// app/admin/dashboard/page.js
import Card from "../../components/admin/Card";

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Total Sales" value="$12,340" />
        <Card title="Orders" value="1,234" />
        <Card title="Customers" value="567" />
        <Card title="Revenue" value="$98,000" />
      </div>
    </div>
  );
}
