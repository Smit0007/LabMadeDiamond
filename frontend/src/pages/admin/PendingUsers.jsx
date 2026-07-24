import { useEffect, useState } from "react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";

import {
  getUsers,
  approveUser,
  rejectUser,
} from "../../services/adminService";

export default function PendingUsers() {
  const [users, setUsers] =
    useState([]);

  const loadUsers = async () => {
    try {
      const response =
        await getUsers();

      const pendingUsers =
        response.data.users.filter(
          (user) =>
            user.status ===
            "pending"
        );

      setUsers(
        pendingUsers
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleApprove =
    async (id) => {
      try {
        await approveUser(id);
        loadUsers();
      } catch (error) {
        console.error(error);
      }
    };

  const handleReject =
    async (id) => {
      try {
        await rejectUser(id);
        loadUsers();
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <AdminSidebar />

      <div className="flex-1">
        <AdminHeader />

        <div className="p-8">
          <div className="rounded-2xl border border-[--border] bg-white p-8">

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#111827]">
                Pending User Approvals
              </h2>

              <p className="mt-2 text-[#6b7280]">
                Review and approve new
                trade accounts.
              </p>
            </div>

            {users.length === 0 ? (
              <div className="rounded-xl border border-dashed p-8 text-center text-[#6b7280]">
                No pending users.
              </div>
            ) : (
              <div className="grid gap-6">
                {users.map((user) => (
                  <div
                    key={user._id}
                    className="rounded-2xl border border-[--border] bg-[#fafafa] p-6"
                  >
                    <div className="grid gap-3 md:grid-cols-2">

                      <div>
                        <p className="text-sm text-[#6b7280]">
                          Full Name
                        </p>

                        <p className="font-semibold text-[#111827]">
                          {user.fullName}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-[#6b7280]">
                          Company Name
                        </p>

                        <p className="font-semibold text-[#111827]">
                          {user.companyName}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-[#6b7280]">
                          Email
                        </p>

                        <p className="font-semibold text-[#111827]">
                          {user.email}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-[#6b7280]">
                          Phone
                        </p>

                        <p className="font-semibold text-[#111827]">
                          {user.phone}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-[#6b7280]">
                          Country
                        </p>

                        <p className="font-semibold text-[#111827]">
                          {user.country}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-[#6b7280]">
                          Business Type
                        </p>

                        <p className="font-semibold text-[#111827]">
                          {user.businessType}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-[#6b7280]">
                          Status
                        </p>

                        <span className="inline-flex rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                          {user.status}
                        </span>
                      </div>

                      <div>
                        <p className="text-sm text-[#6b7280]">
                          User ID
                        </p>

                        <p className="font-mono text-sm text-[#111827]">
                          {user._id}
                        </p>
                      </div>

                    </div>

                    <div className="mt-6 flex gap-3">
                      <button
                        onClick={() =>
                          handleApprove(
                            user._id
                          )
                        }
                        className="rounded-xl bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-700"
                      >
                        Approve User
                      </button>

                      <button
                        onClick={() =>
                          handleReject(
                            user._id
                          )
                        }
                        className="rounded-xl bg-red-600 px-5 py-3 font-medium text-white transition hover:bg-red-700"
                      >
                        Reject User
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}