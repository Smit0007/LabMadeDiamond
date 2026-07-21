import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import InventoryTable from "../components/inventory/InventoryTable";
import InventoryFilters from "../components/inventory/InventoryFilters";

import {
  getInventory,
  getFilterOptions,
} from "../services/inventoryService";

export default function InventoryListing() {
  const { category } = useParams();

  const [inventory, setInventory] =
    useState([]);

  const [filters, setFilters] =
    useState({});

  const [filterOptions,
    setFilterOptions] =
    useState({});

  const [loading, setLoading] =
    useState(true);

  const [page, setPage] =
    useState(1);

  const [limit, setLimit] =
    useState(25);

  const [totalPages,
    setTotalPages] =
    useState(1);

  const [totalRecords,
    setTotalRecords] =
    useState(0);

  useEffect(() => {
    const loadInventory =
      async () => {
        try {
          setLoading(true);

          const response =
            await getInventory(
              category,
              page,
              limit,
              filters
            );

          setInventory(
            response.data.inventory
          );

          setTotalPages(
            response.data.pages
          );

          setTotalRecords(
            response.data.total
          );
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    loadInventory();
  }, [
    category,
    page,
    limit,
    filters,
  ]);

  useEffect(() => {
    const loadFilters =
      async () => {
        try {
          const response =
            await getFilterOptions(
              category
            );

          setFilterOptions(
            response.data.filters
          );
        } catch (error) {
          console.error(error);
        }
      };

    loadFilters();
  }, [category]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-lg text-gray-500">
          Loading inventory...
        </p>
      </div>
    );
  }

  return (
    <>
      <section className="relative overflow-hidden bg-[#111827] py-20">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />

        <div className="container-custom relative z-10">
          <h1 className="text-5xl font-bold capitalize text-white">
            {category.replaceAll(
              "-",
              " "
            )}
          </h1>

          <p className="mt-3 text-neutral-400">
            Browse available inventory and apply filters.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[300px_1fr]">

            <InventoryFilters
              filters={filters}
              setFilters={setFilters}
              filterOptions={filterOptions}
            />

            <div>

              <div className="mb-6 flex items-center justify-between">

                <div>
                  <h2 className="text-2xl font-bold text-[#111827]">
                    Available Inventory
                  </h2>

                  <p className="text-[#6b7280]">
                    {totalRecords} records
                  </p>
                </div>

                <button className="primary-button">
                  Request Quote
                </button>

              </div>

              <InventoryTable
                rowData={inventory}
              />

              <div className="mt-6 flex items-center justify-between">

                <button
                  className="secondary-button"
                  disabled={page === 1}
                  onClick={() =>
                    setPage(
                      page - 1
                    )
                  }
                >
                  Previous
                </button>

                <div className="flex items-center gap-4">

                  <span>
                    Page {page} of {totalPages}
                  </span>

                  <select
                    value={limit}
                    onChange={(e) => {
                      setLimit(
                        Number(
                          e.target.value
                        )
                      );

                      setPage(1);
                    }}
                    className="rounded-lg border px-3 py-2"
                  >
                    <option value={25}>
                      25
                    </option>

                    <option value={50}>
                      50
                    </option>

                    <option value={100}>
                      100
                    </option>
                  </select>

                </div>

                <button
                  className="secondary-button"
                  disabled={
                    page ===
                    totalPages
                  }
                  onClick={() =>
                    setPage(
                      page + 1
                    )
                  }
                >
                  Next
                </button>

              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  );
}