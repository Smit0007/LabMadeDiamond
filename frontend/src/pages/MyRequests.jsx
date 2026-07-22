import {
  useEffect,
  useState,
} from "react";

import {
  getMyRequests,
} from "../services/quoteService";

export default function MyRequests() {

  const [
    requests,
    setRequests,
  ] = useState([]);

  useEffect(() => {

    const loadData =
      async () => {

        const response =
          await getMyRequests();

        setRequests(
          response.data.requests
        );
      };

    loadData();

  }, []);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">

        <h1 className="mb-8 text-4xl font-bold">
          My Requests
        </h1>

        {requests.length === 0 ? (
          <div className="rounded-xl border p-8 text-center">
            No quotation requests found.
          </div>
        ) : (
          <div className="grid gap-4">

            {requests.map(
              (
                request
              ) => (
                <div
                  key={
                    request._id
                  }
                  className="rounded-xl border p-5"
                >

                  <p>
                    <strong>
                      Request ID:
                    </strong>
                    {" "}
                    {
                      request._id
                    }
                  </p>

                  <p>
                    <strong>
                      Total Stones:
                    </strong>
                    {" "}
                    {
                      request.totalItems
                    }
                  </p>

                  <p>
                    <strong>
                      Status:
                    </strong>
                    {" "}
                    {
                      request.status
                    }
                  </p>

                  <p>
                    <strong>
                      Notes:
                    </strong>
                    {" "}
                    {
                      request.notes ||
                      "-"
                    }
                  </p>

                  <p>
                    <strong>
                      Date:
                    </strong>
                    {" "}
                    {new Date(
                      request.createdAt
                    ).toLocaleDateString()}
                  </p>

                </div>
              )
            )}

          </div>
        )}

      </div>
    </section>
  );
}