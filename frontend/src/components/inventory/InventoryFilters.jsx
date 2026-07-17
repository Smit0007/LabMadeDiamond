import { useState } from "react";

export default function InventoryFilters({
  filters,
  setFilters,
  filterOptions,
}) {
  const [openSections,
    setOpenSections] =
    useState({});

  const handleToggle = (
    field,
    value
  ) => {
    const current =
      filters[field] || [];

    const updated =
      current.includes(value)
        ? current.filter(
            (v) => v !== value
          )
        : [
            ...current,
            value,
          ];

    setFilters({
      ...filters,
      [field]: updated,
    });
  };

  const toggleSection = (
    field
  ) => {
    setOpenSections(
      (prev) => ({
        ...prev,
        [field]:
          !prev[field],
      })
    );
  };

  const resetFilters =
    () => {
      setFilters({});
    };

  return (
    <div className="rounded-2xl border border-[--border] bg-white p-6">

      <div className="mb-6 flex items-center justify-between">

        <h3 className="text-lg font-semibold text-[#111827]">
          Filters
        </h3>

        <button
          onClick={
            resetFilters
          }
          className="text-sm text-red-600"
        >
          Reset
        </button>

      </div>

      <div className="space-y-4">

        {Object.entries(
          filterOptions
        ).map(
          ([field, values]) => (

            <div
              key={field}
              className="border-b pb-3"
            >

              <button
                type="button"
                onClick={() =>
                  toggleSection(
                    field
                  )
                }
                className="flex w-full items-center justify-between text-left"
              >

                <span className="font-semibold text-[#111827]">
                  {field}
                </span>

                <span>
                  {openSections[
                    field
                  ]
                    ? "▼"
                    : "▶"}
                </span>

              </button>

              {openSections[
                field
              ] && (

                <div className="mt-3 space-y-2">

                  {values.map(
                    (
                      value
                    ) => (

                      <label
                        key={
                          value
                        }
                        className="flex items-center gap-2 text-sm"
                      >

                        <input
                          type="checkbox"
                          checked={
                            (
                              filters[
                                field
                              ] ||
                              []
                            ).includes(
                              value
                            )
                          }
                          onChange={() =>
                            handleToggle(
                              field,
                              value
                            )
                          }
                        />

                        {value}

                      </label>
                    )
                  )}

                </div>

              )}

            </div>
          )
        )}

      </div>

    </div>
  );
}