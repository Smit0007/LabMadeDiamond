import { useEffect, useState } from "react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import {
  deleteInventoryFile,
} from "../../services/uploadService";


import {
  getFiles,
  deleteFile,
} from "../../services/inventoryService";

export default function InventoryFiles() {
  const [files, setFiles] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const loadFiles = async () => {
    try {
      const response =
        await getFiles();

      setFiles(
        response.data.files
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFiles();
  }, []);

  const handleDelete =
    async (fileId) => {
      const confirmDelete =
        window.confirm(
          "Delete this file and all inventory records?"
        );

      if (!confirmDelete)
        return;

      try {
        await deleteFile(
          fileId
        );

        loadFiles();
      } catch (error) {
        console.error(error);
        alert(
          "Delete failed"
        );
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
                Inventory Files
              </h2>

              <p className="mt-2 text-[#6b7280]">
                Manage uploaded Excel files.
              </p>
            </div>

            {loading ? (
              <p>
                Loading...
              </p>
            ) : files.length ===
              0 ? (
              <div className="rounded-xl border border-dashed p-8 text-center text-[#6b7280]">
                No uploaded files.
              </div>
            ) : (
              <div className="grid gap-6">
                {files.map(
                  (file) => (
                    <div
                      key={
                        file._id
                      }
                      className="rounded-2xl border border-[--border] p-6"
                    >
                      <div className="grid gap-4 md:grid-cols-2">

                        <div>
                          <p className="text-sm text-[#6b7280]">
                            File Name
                          </p>

                          <p className="font-semibold">
                            {
                              file.filename
                            }
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-[#6b7280]">
                            Category
                          </p>

                          <p className="font-semibold">
                            {
                              file.category
                            }
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-[#6b7280]">
                            Total Rows
                          </p>

                          <p className="font-semibold">
                            {
                              file.totalRows
                            }
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-[#6b7280]">
                            Upload Date
                          </p>

                          <p className="font-semibold">
                            {new Date(
                              file.createdAt
                            ).toLocaleString()}
                          </p>
                        </div>

                      </div>

                      <div className="mt-6">
                        <button
                          onClick={() =>
                            handleDelete(
                              file._id
                            )
                          }
                          className="rounded-xl bg-red-600 px-5 py-3 font-medium text-white transition hover:bg-red-700"
                        >
                          Delete File
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}