import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box } from "@mui/material";

const ProductsTable = ({ data }) => {
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

      {
        accessorKey: "stock_quantity",
        header: "Stock Quantity",
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
      {
        accessorKey: "producible_quantity",
        header: "Producible Quantity",
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
  });

  return <MaterialReactTable table={table} />;
};

export default ProductsTable;
