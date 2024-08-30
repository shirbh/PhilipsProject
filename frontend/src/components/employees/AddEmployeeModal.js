import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

export default function AddEmployeeModal({ open, setOpen, setData }) {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState({});

  const handleClose = () => {
    setOpen(false);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    return newErrors;
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
                "http://localhost:3003/employees",
                {
                  first_name: firstName,
                  last_name: lastName,
                  email,
                  password,
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
        <DialogTitle>Add an employee</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="first-name"
            name="first-name"
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setFirstName(e.target.value)}
            InputLabelProps={{ style: { fontSize: 20 } }}
          />
          <TextField
            required
            margin="dense"
            id="last-name"
            name="last-name"
            label="Last Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setLastName(e.target.value)}
            InputLabelProps={{ style: { fontSize: 20 } }}
          />
          <TextField
            required
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
            style={{ fontSize: 20 }}
            InputLabelProps={{ style: { fontSize: 20 } }}
          />
          <TextField
            required
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => setPassword(e.target.value)}
            style={{ fontSize: 20 }}
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
