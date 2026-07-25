import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  getQuoteRequests,
} from "../../services/quoteService";

export default function QuoteRequests() {

  const [
    quotes,
    setQuotes,
  ] = useState([]);

  useEffect(() => {

    const loadQuotes =
      async () => {

        const response =
          await getQuoteRequests();

        setQuotes(
          response.data.quotes
        );
      };

    loadQuotes();

  }, []);

  return (
    <div className="p-8">

      <h1 className="mb-6 text-3xl font-bold">
        Quote Requests
      </h1>

      <div className="overflow-auto rounded-xl border">

        <table className="w-full">

          <thead>
            <tr className="bg-gray-100">

              <th className="p-3 text-left">
                Customer
              </th>

              <th className="p-3 text-left">
                Company
              </th>

              <th className="p-3 text-left">
                Stones
              </th>

              <th className="p-3 text-left">
                Status
              </th>

              <th className="p-3 text-left">
                Action
              </th>

            </tr>
          </thead>

          <tbody>

            {quotes.map(
              (quote) => (
                <tr
                  key={
                    quote._id
                  }
                  className="border-t"
                >

                  <td className="p-3">
                    {
                      quote.userId
                        ?.fullName
                    }
                  </td>

                  <td className="p-3">
                    {
                      quote.userId
                        ?.companyName
                    }
                  </td>

                  <td className="p-3">
                    {
                      quote.totalItems
                    }
                  </td>

                  <td className="p-3 capitalize">
                    {
                      quote.status
                    }
                  </td>

                  <td className="p-3">

                    <Link
                      to={`/admin/quotes/${quote._id}`}
                      className="text-blue-600"
                    >
                      View
                    </Link>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}