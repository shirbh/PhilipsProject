import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "./Employees.css";
import { Container } from "react-bootstrap";
import axios from "axios";
import PermissionsTable from "./PermissionsTable";

const Permissions = () => {
  const [data, setData] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      console.log("here");
      const response = await axios.get("http://localhost:3003/employees");
      setData(response.data);

      const permissionsResponse = await axios.get(
        "http://localhost:3003/employees"
      );
      setPermissions(permissionsResponse.data);

      setLoading(false);
    };
    setLoading(true);
    fetchData();
  }, []);

  return (
    <Container className="employees-wrapper">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <PermissionsTable data={data} permissions={permissions} />
      </LocalizationProvider>
    </Container>
  );
};

export default Permissions;
