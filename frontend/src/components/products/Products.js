import React, { useEffect, useState } from "react";
import ProductsTable from "./ProductsTable";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "./Products.css";
import { Container } from "react-bootstrap";
import Button from "@mui/material/Button";
import DeleteProductModal from "./DeleteProductModal";
import AddProductModal from "./AddProductModal";
import EditProductModal from "./EditProductModal";
import axios from "axios";

const Products = () => {
  const [addModal, setAddModal] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModalData, setDeleteModalData] = useState();

  const [editModal, setEditModal] = useState(false);
  const [editModalData, setEditModalData] = useState();

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3003/products");
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
    <Container className="products-wrapper">
      {deleteModal && (
        <DeleteProductModal
          open={deleteModal}
          setOpen={setDeleteModal}
          data={deleteModalData}
          setData={setData}
        />
      )}
      {addModal && (
        <AddProductModal
          open={addModal}
          setOpen={setAddModal}
          setData={setData}
        />
      )}
      {editModal && (
        <EditProductModal
          open={editModal}
          setOpen={setEditModal}
          data={editModalData}
          setData={setData}
        />
      )}
      <Container className="add-product-button">
        <Button variant="contained" onClick={handleAddClick} size="large">
          Add a product
        </Button>
      </Container>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ProductsTable
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

export default Products;
