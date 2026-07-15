export const deleteInventoryFile =
  (id) => {
    return api.delete(
      `/upload/inventory-files/${id}`
    );
  };