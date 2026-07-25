import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import {
  getQuoteById,
  updateQuoteStatus,  
} from "../../services/adminService";




export default function QuoteDetails() {

  const { id } =
    useParams();

  const [
    data,
    setData,
  ] = useState(null);

  useEffect(() => {

    loadQuote();

  }, []);

  const loadQuote =
    async () => {

      const response =
        await getQuoteById(
          id
        );

      setData(
        response.data
      );
    };

  const changeStatus =
    async (
      status
    ) => {

      await updateQuoteStatus(
        id,
        status
      );

      loadQuote();
    };

  if (!data)
    return (
      <div>
        Loading...
      </div>
    );

  return (
    <div className="p-8">

      <h1 className="mb-6 text-3xl font-bold">
        Quote Details
      </h1>

      <div className="mb-8 rounded-xl border p-6">

        <h2 className="mb-4 text-xl font-semibold">
          Customer
        </h2>

        <p>
          {
            data.quote
              .userId
              .fullName
          }
        </p>

        <p>
          {
            data.quote
              .userId
              .companyName
          }
        </p>

        <p>
          {
            data.quote
              .userId
              .email
          }
        </p>

        <p>
          {
            data.quote
              .userId
              .phone
          }
        </p>

        <p>
          {
            data.quote
              .userId
              .country
          }
        </p>

        <p className="mt-4">
          Notes:
          {" "}
          {
            data.quote
              .notes
          }
        </p>

      </div>

      <div className="mb-8 flex gap-3">

        <button
          onClick={() =>
            changeStatus(
              "contacted"
            )
          }
          className="rounded bg-yellow-500 px-4 py-2 text-white"
        >
          Mark Contacted
        </button>

        <button
          onClick={() =>
            changeStatus(
              "quoted"
            )
          }
          className="rounded bg-green-600 px-4 py-2 text-white"
        >
          Mark Quoted
        </button>

      </div>

      <div className="grid gap-4">

        {data.items.map(
          (
            item,
            index
          ) => (
            <div
              key={index}
              className="rounded-xl border p-5"
            >

              <p>
                <strong>
                  File:
                </strong>
                {" "}
                {
                  item.fileName
                }
              </p>

              <p>
                <strong>
                  Original Stone ID:
                </strong>
                {" "}
                {
                  item.originalStoneId
                }
              </p>

              <p>
                <strong>
                  Stone ID:
                </strong>
                {" "}
                {
                  item.stoneId
                }
              </p>

              <p>
                <strong>
                  Quantity:
                </strong>
                {" "}
                {
                  item.quantity
                }
              </p>

              <p>
                <strong>
                  Stone Net Amt:
                </strong>
                {" "}
                {
                  item.stoneNetAmt
                }
              </p>

            </div>
          )
        )}

      </div>

    </div>
  );
}