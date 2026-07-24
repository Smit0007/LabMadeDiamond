import { useEffect, useState } from "react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";

import {
  getUsers,
  rejectUser,
} from "../../services/adminService";

export default function ApprovedUsers() {
  const [users, setUsers] =
    useState([]);

  const loadUsers = async () => {
    try {
      const response =
        await getUsers();

      const approvedUsers =
        response.data.users.filter(
          (user) =>
            user.status ===
            "approved"
        );

      setUsers(
        approvedUsers
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

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
              <h2 className="text-2xl font-bold">
                Approved Users
              </h2>

              <p className="mt-2 text-[#6b7280]">
                All approved trade accounts.
              </p>
            </div>

            {users.length === 0 ? (
              <div className="rounded-xl border border-dashed p-8 text-center">
                No approved users.
              </div>
            ) : (
              <div className="grid gap-6">
                {users.map((user) => (
                  <div
                    key={user._id}
                    className="rounded-2xl border p-6"
                  >
                    <div className="grid gap-3 md:grid-cols-2">

                      <div>
                        <strong>Name:</strong>{" "}
                        {user.fullName}
                      </div>

                      <div>
                        <strong>Company:</strong>{" "}
                        {user.companyName}
                      </div>

                      <div>
                        <strong>Email:</strong>{" "}
                        {user.email}
                      </div>

                      <div>
                        <strong>Phone:</strong>{" "}
                        {user.phone}
                      </div>

                      <div>
                        <strong>Country:</strong>{" "}
                        {user.country}
                      </div>

                      <div>
                        <strong>Business:</strong>{" "}
                        {user.businessType}
                      </div>

                    </div>

                    <div className="mt-6">
                      <button
                        onClick={() =>
                          handleReject(
                            user._id
                          )
                        }
                        className="rounded-xl bg-red-600 px-5 py-3 text-white"
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