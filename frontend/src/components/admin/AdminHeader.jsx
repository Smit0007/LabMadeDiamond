export default function AdminHeader() {
  return (
    <div className="flex items-center justify-between border-b border-[--border] bg-white px-8 py-5">
      <div>
        <h1 className="text-2xl font-bold text-[#111827]">
          Admin Dashboard
        </h1>

        <p className="text-sm text-[#6b7280]">
          Manage users, inventory and files
        </p>
      </div>
    </div>
  );
}