import { useQuoteCart } from "../../context/QuoteCartContext";

export default function InventoryTable({
  rowData,
}) {
  const { addToCart } =
    useQuoteCart();

  if (!rowData?.length) {
    return (
      <div className="p-6">
        No inventory found.
      </div>
    );
  }

  const columns = Object.keys(
    rowData[0].fields
  ).filter(
    (column) =>
      column !== "Video URL"
  );

  return (
    <div className="overflow-auto rounded-2xl border border-gray-200">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((column) => (
              <th
                key={column}
                className="whitespace-nowrap p-3 text-left text-sm font-semibold"
              >
                {column}
              </th>
            ))}

            <th className="whitespace-nowrap p-3 text-left text-sm font-semibold">
              Video
            </th>

            <th className="whitespace-nowrap p-3 text-left text-sm font-semibold">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {rowData.map((row) => (
            <tr
              key={row._id}
              className="border-t"
            >
              {columns.map((column) => (
                <td
                  key={column}
                  className="whitespace-nowrap p-3 text-sm"
                >
                  {column ===
                  "Certified" ? (
                    <a
                      href={`https://www.igi.org/verify-your-report/?r=${row.fields["Cert No"]}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      {row.fields[
                        "Certified"
                      ]}
                    </a>
                  ) : (
                    String(
                      row.fields[
                        column
                      ] ?? ""
                    )
                  )}
                </td>
              ))}

              <td className="p-3">
                {row.fields[
                  "Video URL"
                ] ? (
                  <a
                    href={
                      row.fields[
                        "Video URL"
                      ]
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
                  >
                    View Video
                  </a>
                ) : (
                  "-"
                )}
              </td>

              <td className="p-3">
                <button
                  onClick={() =>
                    addToCart(row)
                  }
                  className="rounded-lg bg-teal-600 px-3 py-2 text-sm text-white hover:bg-teal-700"
                >
                  Add To Quote
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}