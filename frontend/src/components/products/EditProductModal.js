import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

export default function EditProductModal({ open, setOpen, data, setData }) {
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
              const result = await axios.put(
                `http://localhost:3003/products/${data.id}`,
                {
                  priority,
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
        <DialogTitle>Edit a product</DialogTitle>
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
            {" "}
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
