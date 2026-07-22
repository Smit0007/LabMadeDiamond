import { useState } from "react";
import { useQuoteCart } from "../context/QuoteCartContext";
import { createQuoteRequest } from "../services/quoteService";

export default function QuoteCart() {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    getTotalItems,
  } = useQuoteCart();

  const [notes, setNotes] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const totalItems =
    getTotalItems();

  const handleRequestQuote =
    async () => {
      try {
        if (
          totalItems < 10
        ) {
          alert(
            "Minimum 10 stones required."
          );
          return;
        }

        setLoading(true);

        const items =
          cartItems.map(
            (item) => ({
              inventoryId:
                item._id,
              quantity:
                item.quantity,
            })
          );

        await createQuoteRequest({
          items,
          notes,
        });

        alert(
          "Quotation request submitted successfully."
        );

        clearCart();

        setNotes("");
      } catch (error) {
        console.error(
          error
        );

        alert(
          error.response?.data
            ?.message ||
            "Failed to submit quotation."
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">

        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Quote Cart
          </h1>

          <p className="mt-2 text-[#6b7280]">
            Selected diamonds for quotation.
          </p>
        </div>

        <div className="mb-6 flex items-center justify-between">

          <div>
            <p className="text-lg font-semibold">
              Total Stones:
              {" "}
              {totalItems}
            </p>

            {totalItems < 10 && (
              <p className="text-sm text-red-600">
                Minimum 10 stones required.
              </p>
            )}
          </div>

          <button
            onClick={clearCart}
            className="rounded-xl bg-red-600 px-4 py-2 text-white"
          >
            Clear Cart
          </button>

        </div>

        {cartItems.length === 0 ? (
          <div className="rounded-xl border p-8 text-center">
            No diamonds selected.
          </div>
        ) : (
          <>
            <div className="grid gap-4">

              {cartItems.map(
                (item) => (
                  <div
                    key={
                      item._id
                    }
                    className="rounded-xl border p-5"
                  >

                    <div className="grid gap-4 md:grid-cols-3">

                      <div>
                        <strong>
                          Original Stone ID:
                        </strong>
                        {" "}
                        {
                          item.fields[
                            "Orginal Stone ID"
                          ]
                        }
                      </div>

                      <div>
                        <strong>
                          Stone ID:
                        </strong>
                        {" "}
                        {
                          item.fields[
                            "Stone Id"
                          ]
                        }
                      </div>

                      <div>
                        <strong>
                          Stone Net Amt:
                        </strong>
                        {" "}
                        {
                          item.fields[
                            "Stone Net Amt"
                          ]
                        }
                      </div>

                      <div className="flex items-center gap-2">

                        <button
                          onClick={() =>
                            decreaseQuantity(
                              item._id
                            )
                          }
                          className="rounded bg-gray-200 px-3 py-1"
                        >
                          -
                        </button>

                        <span className="font-semibold">
                          {
                            item.quantity
                          }
                        </span>

                        <button
                          onClick={() =>
                            increaseQuantity(
                              item._id
                            )
                          }
                          className="rounded bg-gray-200 px-3 py-1"
                        >
                          +
                        </button>

                      </div>

                    </div>

                    <div className="mt-4">
                      <button
                        onClick={() =>
                          removeFromCart(
                            item._id
                          )
                        }
                        className="rounded-lg bg-red-600 px-3 py-2 text-white"
                      >
                        Remove
                      </button>
                    </div>

                  </div>
                )
              )}

            </div>

            <div className="mt-8">

              <textarea
                value={notes}
                onChange={(e) =>
                  setNotes(
                    e.target.value
                  )
                }
                placeholder="Additional notes for quotation..."
                className="mb-4 w-full rounded-xl border p-4"
                rows={4}
              />

              <button
                onClick={
                  handleRequestQuote
                }
                disabled={
                  totalItems < 10 ||
                  loading
                }
                className={`rounded-xl px-6 py-3 text-white ${
                  totalItems >= 10
                    ? "bg-teal-600"
                    : "cursor-not-allowed bg-gray-400"
                }`}
              >
                {loading
                  ? "Submitting..."
                  : "Request Quotation"}
              </button>

            </div>
          </>
        )}

      </div>
    </section>
  );
}