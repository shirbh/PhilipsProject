import React, { useEffect, useState } from "react";
import EmployeesTable from "./EmployeesTable";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "./Employees.css";
import { Container } from "react-bootstrap";
import Button from "@mui/material/Button";
import DeleteEmployeeModal from "./DeleteEmployeeModal";
import AddEmployeeModal from "./AddEmployeeModal";
import EditEmployeeModal from "./EditEmployeeModal";
import axios from "axios";

const Employees = () => {
  const [addModal, setAddModal] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModalData, setDeleteModalData] = useState();

  const [editModal, setEditModal] = useState(false);
  const [editModalData, setEditModalData] = useState();

  const [data, setData] = useState([]);

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleAddClick = () => {
    setAddModal(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3003/employees");
      setData(response.data);

      const productsResponse = await axios.get(
        "http://localhost:3003/products"
      );
      setProducts(productsResponse.data);

      setLoading(false);
    };
    setLoading(true);
    fetchData();
  }, []);

  return (
    <Container className="employees-wrapper">
      {deleteModal && (
        <DeleteEmployeeModal
          open={deleteModal}
          setOpen={setDeleteModal}
          data={deleteModalData}
          setData={setData}
        />
      )}
      {addModal && (
        <AddEmployeeModal
          open={addModal}
          setOpen={setAddModal}
          setData={setData}
        />
      )}
      {editModal && (
        <EditEmployeeModal
          open={editModal}
          setOpen={setEditModal}
          data={editModalData}
          setData={setData}
        />
      )}
      <Container className="add-employee-button">
        <Button variant="contained" onClick={handleAddClick} size="large">
          Add an employee
        </Button>
      </Container>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <EmployeesTable
          setDeleteModal={setDeleteModal}
          setDeleteModalData={setDeleteModalData}
          setEditModal={setEditModal}
          setEditModalData={setEditModalData}
          data={data}
          products={products}
        />
      </LocalizationProvider>
    </Container>
  );
};

export default Employees;
