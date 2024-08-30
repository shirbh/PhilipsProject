import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "./Machines.css";
import { Container } from "react-bootstrap";
import MachinesList from "./MachinesTable";
import Button from "@mui/material/Button";
import DeleteMachineModal from "./DeleteMachineModal";
import AddMachineModal from "./AddMachineModal";
import EditMachineModal from "./EditMachineModal";
import axios from "axios";

const Machines = () => {
  const [addModal, setAddModal] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModalData, setDeleteModalData] = useState();

  const [editModal, setEditModal] = useState(false);
  const [editModalData, setEditModalData] = useState();

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3003/machines");
      setData(response.data);
      setLoading(false);
    };
    setLoading(true);
    fetchData();
  }, []);

  const handleAddClick = () => {
    setAddModal(true);
  };

  return (
    <Container className="employees-wrapper">
      {deleteModal && (
        <DeleteMachineModal
          open={deleteModal}
          setOpen={setDeleteModal}
          data={deleteModalData}
          setData={setData}
        />
      )}
      {addModal && (
        <AddMachineModal
          open={addModal}
          setOpen={setAddModal}
          setData={setData}
        />
      )}
      {editModal && (
        <EditMachineModal
          open={editModal}
          setOpen={setEditModal}
          data={editModalData}
          setData={setData}
        />
      )}
      <Container className="add-machine-button">
        <Button variant="contained" onClick={handleAddClick} size="large">
          Add a machine
        </Button>
      </Container>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MachinesList
          setDeleteModal={setDeleteModal}
          setDeleteModalData={setDeleteModalData}
          setEditModal={setEditModal}
          setEditModalData={setEditModalData}
          data={data}
        />
      </LocalizationProvider>
    </Container>
  );
};

export default Machines;
