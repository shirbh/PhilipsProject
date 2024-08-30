import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button, Container } from "react-bootstrap";
import "./EmployeeCalendar.css";
import EmployeeCell from "./EmployeeCell";
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
  const handleSaveCalendar = async () => {
    try {
      console.log({ saveData });
      await axios.post(
        `http://localhost:3003/employees/unavailability/${state.id}`,
        saveData
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3003/employees/unavailability/${state.id}`
        );
        setData(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [state.id]);

  console.log({ data });
  return (
    <Container className="wrapper">
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          paddingRight: "120px",
        }}
      >
        <Button onClick={handleSaveCalendar} size="large">
          Save Calendar
        </Button>
      </Container>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        selectable={true}
        initialView="dayGridMonth"
        dayCellContent={({ dayNumberText, date }) => (
          <EmployeeCell
            dayNumberText={dayNumberText}
            date={dateToYMD(date)}
            setData={setData}
            setSaveData={setSaveData}
            data={data}
          />
        )}
      />
    </Container>
  );
}
