import React, { useEffect, useState } from "react";
import InventoryTable from "./InventoryTable";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "./Products.css";
import { Container } from "react-bootstrap";
import Button from "@mui/material/Button";
import axios from "axios";

const Inventory = () => {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleAddClick = async () => {
    await axios.post(`http://localhost:3003/products/materials/1`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:3003/products/inventory/materials/1"
      );
      console.log(response.data);
      setData(response.data);

      setLoading(false);
    };
    setLoading(true);
    fetchData();
  }, []);

  return (
    <Container className="products-wrapper">
      <Container className="add-product-button">
        <Button variant="contained" onClick={handleAddClick} size="large">
          Add 100,000 units of material
        </Button>
      </Container>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <InventoryTable data={data} />
      </LocalizationProvider>
    </Container>
  );
};

export default Inventory;
