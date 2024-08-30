import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, MenuItem } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const ProductsTable = ({
  setDeleteModal,
  setDeleteModalData,
  setEditModal,
  setEditModalData,
  data,
}) => {
  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => row.id,
        accessorKey: "id",
        header: "Product ID",
        size: 250,
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "30px" }}>{renderedCellValue}</span>
          </Box>
        ),
      },
      {
        accessorKey: "priority",
        header: "Product Priority",
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
        style={{ fontSize: "30px" }}
        key={0}
        onClick={() => {
          setDeleteModal(true);
          setDeleteModalData(row.original);
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <Delete style={{ marginRight: "5px" }} />
        Delete
      </MenuItem>,
      <MenuItem
        style={{ fontSize: "30px" }}
        key={1}
        onClick={() => {
          setEditModal(true);
          setEditModalData(row.original);
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <Edit style={{ marginRight: "5px" }} />
        Edit
      </MenuItem>,
    ],
  });

  return <MaterialReactTable table={table} />;
};

export default ProductsTable;
