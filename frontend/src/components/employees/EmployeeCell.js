import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import "./EmployeeCell.css";

const MachineCell = ({ dayNumberText, date, setSaveData, data }) => {
  const [morning, setMorning] = useState(true);
  const [noon, setNoon] = useState(true);
  const [night, setNight] = useState(true);

  const handleClickWrapper = (shiftNumber) => {
    return () => {
      if (shiftNumber === 1) {
        setMorning((prev) => !prev);
      } else if (shiftNumber === 2) {
        setNoon((prev) => !prev);
      } else {
        setNight((prev) => !prev);
      }
      setSaveData((prev) => ({
        ...prev,
        [date]: {
          morning: shiftNumber === 1 ? !morning : morning,
          noon: shiftNumber === 2 ? !noon : noon,
          night: shiftNumber === 3 ? !night : night,
        },
      }));
    };
  };

  useEffect(() => {
    setMorning(data[date] ? data[date].morning : true);
    setNoon(data[date] ? data[date].noon : true);
    setNight(data[date] ? data[date].night : true);
  }, [data, date]);

  return (
    <Container className="cell-wrapper">
      <Container className="dayNumber-wrapper">{dayNumberText}</Container>
      <Container className="shifts">
        <Button
          className={morning ? "shift-button" : "shift-button-no"}
          onDoubleClick={handleClickWrapper(1)}
          variant="primary"
        >
          Morning
        </Button>
        <Button
          className={noon ? "shift-button" : "shift-button-no"}
          onDoubleClick={handleClickWrapper(2)}
          variant="primary"
        >
          Noon
        </Button>
        <Button
          className={night ? "shift-button" : "shift-button-no"}
          onDoubleClick={handleClickWrapper(3)}
          variant="primary"
        >
          Night
        </Button>
      </Container>
    </Container>
  );
};

export default MachineCell;
