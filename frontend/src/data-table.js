import DataTable from "react-data-table-component";

export default function DataTablePage({ personnels }) {
  const columns = [
    {
      name: "Name",
      selector: (row) => row.personnel_name,
      sortable: true,
    },
    {
      name: "Surname",
      selector: (row) => row.personnel_surname,
      sortable: true,
    },
    {
      name: "Birthday",
      selector: (row) => row.personnel_birthday,
      sortable: true,
    },
    {
      name: "Birthday Place",
      selector: (row) => row.personnel_birthplace,
      sortable: true,
    },
  ];

  return <DataTable columns={columns} data={personnels} />;
}
