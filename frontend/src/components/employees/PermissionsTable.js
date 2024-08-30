import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo } from "react";
import { Box } from "@mui/material";
import PermissionCell from "./PermissionCell";
import axios from "axios";

const PermissionsTable = ({ data, permissions }) => {
  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => `${row.first_name} ${row.last_name}`,
        id: "name",
        header: "Name",
        size: 250,
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
        size: 300,
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
        accessorKey: "permissions",
        header: "Permissions",
        Cell: ({ row }) => (
          <PermissionCell
            onCheckChange={async (action) => {
              try {
                action
                  ? await axios.post(
                      `http://localhost:3003/employees/permissions/${row.original.id}`,
                      {}
                    )
                  : await axios.delete(
                      `http://localhost:3003/employees/permissions/${row.original.id}`,
                      {}
                    );
              } catch (e) {}
            }}
            permissions={permissions}
            id={row.original.id}
          />
        ),
      },
    ],
    [permissions]
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

export default PermissionsTable;
