import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

export default function AddProductModal({ open, setOpen, setData }) {
  const [priority, setPriority] = useState();

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
              const result = await axios.post(
                "http://localhost:3003/products",
                {
                  priority,
                }
              );
              setData((prev) => [...prev, result.data]);
            } catch (e) {
              console.log(e);
            }
            handleClose();
          },
        }}
      >
        <DialogTitle>Add a product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="priority"
            name="priority"
            label="Priority"
            type="number"
            fullWidth
            variant="standard"
            InputProps={{
              inputProps: { min: 1 },
            }}
            onChange={(e) => setPriority(e.target.value)}
            InputLabelProps={{ style: { fontSize: 20 } }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ fontSize: 20 }}>
            Cancel
          </Button>
          <Button type="submit" style={{ fontSize: 20 }}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
