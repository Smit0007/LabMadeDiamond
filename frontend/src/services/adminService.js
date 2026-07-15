import api from "./api";

export const getStats = () => {
  return api.get(
    "/admin/stats"
  );
};

export const getUsers = () => {
  return api.get("/admin/users");
};

export const approveUser = (id) => {
  return api.patch(
    `/admin/users/${id}/approve`
  );
};

export const rejectUser = (id) => {
  return api.patch(
    `/admin/users/${id}/reject`
  );
};

export const adminLogin =
  (data) => {
    return api.post(
      "/admin/login",
      data
    );
  };

export const getQuoteById = (id) => {
  return api.get(
    `/admin/quotes/${id}`
  );
};

export const updateQuoteStatus = (
  id,
  status
) => {
  return api.patch(
    `/admin/quotes/${id}/status`,
    { status }
  );
};