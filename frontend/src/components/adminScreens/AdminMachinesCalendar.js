import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button, Container } from "react-bootstrap";
import "./AdminMachinesCalendar.css";
import Cell from "./Cell";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ShiftModal from "./ShiftModal";

function dateToYMD(date) {
  var d = date.getDate();
  var m = date.getMonth() + 1;
  var y = date.getFullYear();
  return "" + y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d);
}

export default function AdminMachinesCalendar() {
  const { state } = useLocation();

  const dateToShift = state.shifts?.reduce((acc, curr) => {
    acc[`${curr.date}:${curr.time}`] = curr;
    return acc;
  }, {});

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState();

  return (
    <Container className="wrapper">
      {modalOpen && (
        <ShiftModal setOpen={setModalOpen} open={modalOpen} data={modalData} />
      )}
      <Container
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      ></Container>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        selectable={true}
        initialView="dayGridMonth"
        dayCellContent={({ dayNumberText, date }) => (
          <Cell
            dayNumberText={dayNumberText}
            date={dateToYMD(date)}
            setModalOpen={setModalOpen}
            setModalData={setModalData}
            data={dateToShift ?? {}}
          />
        )}
      />
    </Container>
  );
}
