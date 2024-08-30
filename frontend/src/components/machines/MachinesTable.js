import { useContext, useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, MenuItem } from "@mui/material";
import { Delete, Edit, CalendarMonth } from "@mui/icons-material";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import AppContext from "../../context/AppContext";

const MachinesList = ({
  setDeleteModal,
  setDeleteModalData,
  setEditModal,
  setEditModalData,
  data,
}) => {
  const navigate = useNavigate();
  const [, , , setTitle] = useContext(AppContext);
  const handleCalendarClick = (row) => {
    setTitle(`Machine ${row.id}`);
    navigate("./calendar", { state: row });
  };
  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => row.id,
        id: "id",
        header: "Machine ID",
        size: 250,
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <span style={{ fontSize: "30px" }}>{renderedCellValue}</span>
          </Box>
        ),
        sortingFn: (rowA, rowB, columnId) => rowA.id - rowB.id,
      },
      {
        accessorKey: "product_capacity",
        header: "Product Capacity",
        Cell: ({ renderedCellValue }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <span style={{ fontSize: "30px" }}>{renderedCellValue}</span>
          </Box>
        ),
        sortingFn: (rowA, rowB, columnId) => rowA.id - rowB.id,
      },
      {
        accessorKey: "employee_capacity",
        header: "Employee Capacity",
        Cell: ({ renderedCellValue }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <span style={{ fontSize: "30px" }}>{renderedCellValue}</span>
          </Box>
        ),
        sortingFn: (rowA, rowB, columnId) => rowA.id - rowB.id,
      },
      {
        header: "Availability",
        filterVariant: "none",
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
    []
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

export default MachinesList;
