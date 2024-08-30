import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import "./Cell.css";

const Cell = ({ dayNumberText, date, shifts }) => {
  const [data, setData] = useState();

  useEffect(() => {
    setData(shifts[date]);
  }, [shifts]);

  return (
    <Container className="cell-wrapper">
      <Container className="dayNumber-wrapper">{dayNumberText}</Container>
      <Container className="shifts">
        <Button
          size="large"
          className={
            data?.time === "morning" ? "shift-button" : "shift-button-no"
          }
          variant="primary"
        >
          {data?.time === "morning" ? data.machine : "no shift"}
        </Button>
        <Button
          size="large"
          className={data?.time === "noon" ? "shift-button" : "shift-button-no"}
          variant="primary"
        >
          {data?.time === "noon" ? data.machine : "no shift"}
        </Button>
        <Button
          size="large"
          className={
            data?.time === "night" ? "shift-button" : "shift-button-no"
          }
          variant="primary"
        >
          {data?.time === "night" ? data.machine : "no shift"}
        </Button>
      </Container>
    </Container>
  );
};

export default Cell;
