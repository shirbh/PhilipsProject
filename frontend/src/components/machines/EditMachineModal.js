import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

export default function AddMachineModal({ open, setOpen, data, setData }) {
  const [productCapacity, setProductCapacity] = useState();
  const [employeeCapacity, setEmployeeCapacity] = useState();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: async (event) => {
            event.preventDefault();
            try {
              const result = await axios.put(
                `http://localhost:3003/machines/${data.id}`,
                {
                  product_capacity: productCapacity,
                  employee_capacity: employeeCapacity,
                }
              );
              console.log(result.data);
              setData((prev) => {
                const filtered = prev.filter((item) => item.id !== data.id);
                return [...filtered, result.data];
              });
            } catch (e) {
              console.log(e);
            }
            handleClose();
          },
        }}
      >
        <DialogTitle>Edit a machine</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="product-capacity"
            name="product-capacity"
            label="Product Capacity"
            type="number"
            fullWidth
            variant="standard"
            InputProps={{
              inputProps: { min: 1 },
            }}
            value={data.productCapacity}
            onChange={(e) => setProductCapacity(e.target.value)}
            InputLabelProps={{ style: { fontSize: 20 } }}
          />
          <TextField
            required
            margin="dense"
            id="employee-capacity"
            name="employee-capacity"
            label="Employee Capacity"
            type="number"
            fullWidth
            variant="standard"
            InputProps={{
              inputProps: { min: 1 },
            }}
            value={data.employeeCapacity}
            onChange={(e) => setEmployeeCapacity(e.target.value)}
            InputLabelProps={{ style: { fontSize: 20 } }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ fontSize: 20 }}>
            Cancel
          </Button>
          <Button type="submit" style={{ fontSize: 20 }}>
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
