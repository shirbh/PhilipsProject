import React from "react";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import Button from "@mui/joy/Button";
import axios from "axios";

function DeleteProductModal({ open, setOpen, data, setData }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3003/products/${data.id}`);
      setData((prevData) => prevData.filter((item) => item.id !== data.id));
      setOpen(false);
    } catch (e) {}
  };
  return (
    <React.Fragment>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle style={{ fontSize: 20 }}>
            <WarningRoundedIcon />
            Deletion
          </DialogTitle>
          <Divider />
          <DialogContent style={{ fontSize: 20 }}>
            {`Are you sure you want to delete product ${data.id}?`}
          </DialogContent>
          <DialogActions>
            <Button
              variant="solid"
              color="danger"
              onClick={handleDelete}
              style={{ fontSize: 20 }}
            >
              Delete
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setOpen(false)}
              style={{ fontSize: 20 }}
            >
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}

export default DeleteProductModal;
