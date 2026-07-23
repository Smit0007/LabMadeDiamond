import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminStats from "../../components/admin/AdminStats";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <AdminSidebar />

      <div className="flex-1">
        <AdminHeader />

        <div className="p-8">
          <AdminStats />

          <div className="mt-8 rounded-2xl border border-[--border] bg-white p-8">
            <h2 className="text-xl font-bold text-[#111827]">
              Recent Activity
            </h2>

            <p className="mt-3 text-[#6b7280]">
              Activity feed will appear here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}