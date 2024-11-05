export const columns = [
    { name: "id", selector: (row) => row._id },
    {
      name: "Department Name",
      selector: (row) => row.departmentName,
      sortable: true, // Enable sorting for this column
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Updated At",
      selector: (row) => new Date(row.updatedAt).toLocaleDateString(),
      sortable: true,
    },
  ];
  