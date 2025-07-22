// components/admin/Sidebar.js
import Link from "next/link";
import { LayoutDashboard, Package, Users, CreditCard, Settings } from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: CreditCard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-white border-r h-full">
      <div className="text-xl font-bold p-4 border-b">Admin Panel</div>
      <nav className="p-4 space-y-2">
        {links.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 p-2 rounded">
            <Icon className="w-5 h-5" />
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
