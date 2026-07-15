import api from "./api";

export const getInventory = (
  category,
  page = 1,
  limit = 25,
  filters = {}
) => {

  const params =
    new URLSearchParams();

  params.append(
    "page",
    page
  );

  params.append(
    "limit",
    limit
  );

  Object.entries(
    filters
  ).forEach(
    ([key, values]) => {

      if (
        Array.isArray(values) &&
        values.length
      ) {

        params.append(
          key.toLowerCase(),
          values.join(",")
        );
      }
    }
  );

  return api.get(
    `/inventory/${category}?${params.toString()}`
  );
};

export const getFiles =
  () => {
    return api.get(
      "/inventory/files"
    );
  };

export const deleteFile =
  (fileId) => {
    return api.delete(
      `/inventory/files/${fileId}`
    );
  };

export const getFilterOptions =
  (category) => {
    return api.get(
      `/inventory/filters/${category}`
    );
  };