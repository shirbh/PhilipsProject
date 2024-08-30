import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

export default function ShiftModal({ setOpen, data, open }) {
  const handleClose = () => {
    setOpen(false);
  };

  const Data = () => {
    return (
      <div style={{ fontSize: "20px", marginLeft: "30px" }}>
        Employees in the shift are:
        {data.employees.map((e) => (
          <div key={e.id}>{`${e.first_name} ${e.last_name}`}</div>
        ))}
        <div>{`Working on product ${data.product.id}`}</div>
      </div>
    );
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
              await axios.post(
                `http://localhost:3003/products/inventory/product/${data.product.id}`,
                { quantity: 400 }
              );
            } catch (e) {
              console.log(e);
            }
            handleClose();
          },
        }}
      >
        <DialogTitle>Shift information:</DialogTitle>
        {!data ? (
          <div style={{ fontSize: "20px", margin: "20px" }}>
            No data for this shift
          </div>
        ) : (
          <Data />
        )}
        <DialogActions>
          <Button onClick={handleClose} style={{ fontSize: 20 }}>
            Cancel
          </Button>
          {data && (
            <Button type="submit" style={{ fontSize: 20 }}>
              Mark shift as completed
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
