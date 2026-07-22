import { NavLink } from "react-router-dom";

const links = [
  {
    name: "Dashboard",
    path: "/admin",
  },
  {
    name: "Pending Users",
    path: "/admin/pending-users",
  },
  {
    name: "Approved Users",
    path: "/admin/approved-users",
  },
  {
    name: "Upload Inventory",
    path: "/admin/upload",
  },
  {
    name: "Inventory Files",
    path: "/admin/files",
  },
  {
    name: "Quotation",
    path: "/admin/quotes",
  },
];

export default function AdminSidebar() {
  return (
    <aside className="w-72 border-r border-white/10 bg-[#0f172a]">
      <div className="border-b border-white/10 p-6">
        <h2 className="text-xl font-bold text-white">
          Diamond Admin
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Management Portal
        </p>
      </div>

      <nav className="p-4">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/admin"}
            className={({ isActive }) =>
              `mb-2 block rounded-xl px-4 py-3 transition ${
                isActive
                  ? "bg-teal-600 text-white"
                  : "text-white hover:bg-slate-800"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}