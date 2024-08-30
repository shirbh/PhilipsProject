import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button, Container } from "react-bootstrap";
import "./Home.css";
import Cell from "./Cell";
import { useLocation } from "react-router-dom";
import axios from "axios";

function dateToYMD(date) {
  var d = date.getDate();
  var m = date.getMonth() + 1;
  var y = date.getFullYear();
  return "" + y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d);
}

export default function EmployeeCalendar() {
  const [data, setData] = useState({});
  const [saveData, setSaveData] = useState({});
  const { state } = useLocation();
  const [shifts, setShifts] = useState({});

  const user = localStorage.getItem("user");
  const id = state.id ?? user.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3003/employees/unavailability/${id}`
        );
        setData(response.data);

        const shiftsResponse = await axios.get(
          `http://localhost:3003/shifts/${id}`
        );
        setShifts(shiftsResponse.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [state.id]);

  return (
    <Container className="wrapper">
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          paddingRight: "120px",
        }}
      ></Container>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        selectable={true}
        initialView="dayGridMonth"
        dayCellContent={({ dayNumberText, date }) => (
          <Cell
            dayNumberText={dayNumberText}
            date={dateToYMD(date)}
            setData={setData}
            setSaveData={setSaveData}
            data={data}
            shifts={shifts}
          />
        )}
      />
    </Container>
  );
}
