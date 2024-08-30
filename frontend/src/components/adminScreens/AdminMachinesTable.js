import { useContext, useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box } from "@mui/material";
import { CalendarMonth } from "@mui/icons-material";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import AppContext from "../../context/AppContext";

const AdminMachinesList = ({ data, shifts }) => {
  const navigate = useNavigate();
  const [, , , setTitle] = useContext(AppContext);
  const handleCalendarClick = (row) => {
    setTitle(`Machine ${row.id} shifts`);
    navigate("./machines-calendar", {
      state: {
        shifts: shifts[row.id],
      },
    });
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
        header: "Shifts",
        id: "shifts",
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
    [data, shifts]
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

export default AdminMachinesList;
