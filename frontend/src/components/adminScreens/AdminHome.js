import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "./AdminHome.css";
import { Container } from "react-bootstrap";
import AdminMachinesList from "./AdminMachinesTable";
import axios from "axios";

const AdminHome = () => {
  const [data, setData] = useState([]);
  const [shifts, setShifts] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3003/machines");
      setData(response.data);

      const shiftsResponse = await axios.get("http://localhost:3003/shifts");
      setShifts(shiftsResponse.data);
      setLoading(false);
    };
    setLoading(true);
    fetchData();
  }, []);

  return (
    <Container className="employees-wrapper">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AdminMachinesList data={data} shifts={shifts} />
      </LocalizationProvider>
    </Container>
  );
};

export default AdminHome;
