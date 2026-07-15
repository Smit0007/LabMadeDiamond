import api from "./api";

export const createQuoteRequest =
  (data) => {
    return api.post(
      "/quotes",
      data
    );
  };

export const getQuoteRequests =
  () => {
    return api.get(
      "/quotes"
    );
  };

export const getQuoteRequest =
  (id) => {
    return api.get(
      `/quotes/${id}`
    );
  };

export const updateQuoteStatus =
  (id, status) => {
    return api.patch(
      `/quotes/${id}/status`,
      { status }
    );
  };

export const getMyRequests =
  () => {
    return api.get(
      "/quotes/my-requests"
    );
  };