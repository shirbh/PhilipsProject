import React from "react";
import { Button, Container } from "react-bootstrap";
import "./Cell.css";

const Cell = ({ dayNumberText, date, data, setModalOpen, setModalData }) => {
  const handleClickWrapper = (shiftNumber) => {
    return () => {
      if (shiftNumber === 1) {
        setModalData(data[`${date}:morning`]);
        setModalOpen(true);
      } else if (shiftNumber === 2) {
        setModalData(data[`${date}:noon`]);
        setModalOpen(true);
      } else {
        setModalData(data[`${date}:night`]);
        setModalOpen(true);
      }
    };
  };

  return (
    <Container className="cell-wrapper">
      <Container className="dayNumber-wrapper">{dayNumberText}</Container>
      <Container className="shifts">
        <Button
          className={"shift-button"}
          onDoubleClick={handleClickWrapper(1)}
          variant="primary"
        >
          Morning
        </Button>
        <Button
          className={"shift-button"}
          onDoubleClick={handleClickWrapper(2)}
          variant="primary"
        >
          Noon
        </Button>
        <Button
          className={"shift-button"}
          onDoubleClick={handleClickWrapper(3)}
          variant="primary"
        >
          Night
        </Button>
      </Container>
    </Container>
  );
};

export default Cell;
