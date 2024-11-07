

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
    {
      name:"Action",
      selector:(row)=>row.action
    }
  ];
  
  
  export function ActionButtons() {
    return (
      <div>
        <button className="bg-green-600 hover:bg-green-700 rounded text-xl text-white p-2 mr-2 ">Edit</button>
        <button className="bg-red-600 hover:bg-red-700 rounded text-xl text-white p-2">Delete</button>
      </div>
    )
  }
  