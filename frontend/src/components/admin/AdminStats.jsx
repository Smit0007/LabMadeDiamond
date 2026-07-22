import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  getStats,
} from "../../services/adminService";

export default function AdminStats() {
  const [stats, setStats] =
    useState(null);

  useEffect(() => {
    const loadStats =
      async () => {
        try {
          const response =
            await getStats();

          setStats(
            response.data
          );
        } catch (error) {
          console.error(
            error
          );
        }
      };

    loadStats();
  }, []);

  if (!stats) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  const cards = [
    {
      title:
        "Total Users",
      value:
        stats.totalUsers,
    },
    {
      title:
        "Approved Users",
      value:
        stats.approvedUsers,
      link:
        "/admin/approved-users",
    },
    {
      title:
        "Pending Users",
      value:
        stats.pendingUsers,
      link:
        "/admin/pending-users",
    },
    {
      title:
        "Inventory Records",
      value:
        stats.inventoryRecords,
    },
    {
      title:
        "Uploaded Files",
      value:
        stats.uploadedFiles,
      link:
        "/admin/files",
    },
    {
      title:
        "Quote Requests",
      value:
        stats.quoteRequests || 0,
      link:
        "/admin/quotes",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {cards.map(
        (card) => {
          const content =
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
              <p className="text-sm text-gray-500">
                {card.title}
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#111827]">
                {card.value}
              </h2>
            </div>;

          return card.link ? (
            <Link
              key={
                card.title
              }
              to={
                card.link
              }
            >
              {content}
            </Link>
          ) : (
            <div
              key={
                card.title
              }
            >
              {content}
            </div>
          );
        }
      )}
    </div>
  );
}