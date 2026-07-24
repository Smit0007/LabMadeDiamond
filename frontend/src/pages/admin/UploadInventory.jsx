import { useState } from "react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";

import api from "../../services/api";

export default function UploadInventory() {
  const [file, setFile] =
    useState(null);

  const [category, setCategory] =
    useState("all");

  const [uploading,
    setUploading] =
    useState(false);

  const handleUpload =
    async () => {
      if (!file) {
        alert(
          "Select a file"
        );
        return;
      }

      try {
        setUploading(true);

        const formData =
          new FormData();

        formData.append(
          "file",
          file
        );

        formData.append(
          "category",
          category
        );

        const response =
          await api.post(
            "/upload/inventory",
            formData,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data",
              },
            }
          );

        alert(
          `${response.data.rowsImported} rows imported`
        );

        setFile(null);
      } catch (error) {
        console.error(error);

        alert(
          error.response?.data
            ?.message ||
            "Upload failed"
        );
      } finally {
        setUploading(false);
      }
    };

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <AdminSidebar />

      <div className="flex-1">
        <AdminHeader />

        <div className="p-8">

          <div className="rounded-2xl border border-[--border] bg-white p-8">

            <h2 className="mb-2 text-2xl font-bold">
              Upload Inventory
            </h2>

            <p className="mb-8 text-[#6b7280]">
              Upload Excel inventory files.
            </p>

            <div className="space-y-6">

              <div>
                <label className="mb-2 block font-medium">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border p-3"
                >
                  <option value="all">
                    All
                  </option>

                  <option value="cvd-certified">
                    CVD Certified
                  </option>

                  <option value="cvd-non-certified">
                    CVD Non Certified
                  </option>

                  <option value="wholesale-melee">
                    Wholesale Melee
                  </option>
                </select>
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Excel File
                </label>

                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={(e) =>
                    setFile(
                      e.target.files[0]
                    )
                  }
                  className="w-full rounded-xl border p-3"
                />
              </div>

              <button
                onClick={
                  handleUpload
                }
                disabled={
                  uploading
                }
                className="rounded-xl bg-teal-600 px-6 py-3 font-medium text-white"
              >
                {uploading
                  ? "Uploading..."
                  : "Upload Inventory"}
              </button>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}