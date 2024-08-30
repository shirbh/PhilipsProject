import { useContext, useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, MenuItem } from "@mui/material";
import { Button } from "react-bootstrap";
import { Delete, Edit, CalendarMonth } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";
import CertificationsCell from "./CertificationsCell";
import axios from "axios";

const EmployeesTable = ({
  setDeleteModal,
  setDeleteModalData,
  setEditModal,
  setEditModalData,
  data,
  products,
}) => {
  const navigate = useNavigate();
  const [, , , setTitle] = useContext(AppContext);
  const handleCalendarClick = (row) => {
    setTitle(`${row.first_name} ${row.last_name}`);
    navigate("./calendar", { state: row });
  };

  const getCheckedCerts = (id) => {
    const employee = data.find((item) => item.id === id);
    if (!employee || !employee.certifications) {
      return [];
    }
    return employee.certifications.map((cert) => cert.certification_num);
  };

  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => `${row.first_name} ${row.last_name}`,
        id: "name",
        header: "Name",
        size: 200,
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <span style={{ fontSize: "30px", marginLeft: "0px" }}>
              {renderedCellValue}
            </span>
          </Box>
        ),
      },
      {
        accessorKey: "email",
        enableClickToCopy: true,
        filterVariant: "autocomplete",
        header: "Email",
        size: 200,
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <span style={{ fontSize: "30px", marginLeft: "0px" }}>
              {renderedCellValue}
            </span>
          </Box>
        ),
      },
      {
        accessorKey: "id",
        header: "Employee ID",
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <span style={{ fontSize: "30px", marginLeft: "0px" }}>
              {renderedCellValue}
            </span>
          </Box>
        ),
      },
      {
        accessorKey: "certifications",
        header: "Certifications",
        Cell: ({ row }) => (
          <CertificationsCell
            products={products}
            onCheckChange={async (productId, action) => {
              action
                ? await axios.post(
                    `http://localhost:3003/employees/certifications/${row.original.id}`,
                    { certification_number: productId }
                  )
                : await axios.post(
                    `http://localhost:3003/employees/certifications/delete/${row.original.id}`,
                    { certification_number: productId }
                  );
            }}
            checkedCerts={getCheckedCerts(row.original.id)}
          />
        ),
      },
      {
        accessorKey: "availability",
        header: "Availability",
        Cell: ({ row }) => {
          return (
            <div style={{}}>
              <Button onClick={() => handleCalendarClick(row.original)}>
                <CalendarMonth />
              </Button>
            </div>
          );
        },
      },
    ],
    [products]
  );

  const table = useMaterialReactTable({
    muiTableHeadCellProps: { sx: { fontSize: "20px" } },
    columns,
    data,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableFacetedValues: true,
    enableRowActions: true,
    initialState: {
      showGlobalFilter: true,
      columnPinning: {
        left: ["mrt-row-expand", "mrt-row-select"],
        right: ["mrt-row-actions"],
      },
    },
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
    muiPaginationProps: {
      color: "secondary",
      rowsPerPageOptions: [10, 20, 30],
      shape: "rounded",
      variant: "outlined",
    },
    renderRowActionMenuItems: ({ closeMenu, row }) => [
      <MenuItem
        key={0}
        onClick={() => {
          setDeleteModal(true);
          setDeleteModalData(row.original);
          closeMenu();
        }}
        style={{ fontSize: "30px" }}
        sx={{ m: 0 }}
      >
        <Delete style={{ marginRight: "5px" }} />
        Delete
      </MenuItem>,
      <MenuItem
        key={1}
        onClick={() => {
          setEditModal(true);
          setEditModalData(row.original);
          closeMenu();
        }}
        style={{ fontSize: "30px" }}
        sx={{ m: 0 }}
      >
        <Edit style={{ marginRight: "5px" }} />
        Edit
      </MenuItem>,
    ],
  });

  return <MaterialReactTable table={table} />;
};

export default EmployeesTable;
