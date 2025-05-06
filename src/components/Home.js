import { Button } from '@mui/material';
import React from 'react';

const listExam = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const getStartEndIndex = (key) => {
  switch (key) {
    case 1:
      return [0, 59];
    case 2:
      return [60, 119];
    case 3:
      return [120, 179];
    case 4:
      return [180, 239];
    case 5:
      return [240, 299];
    case 6:
      return [300, 359];
    case 7:
      return [360, 419];
    case 8:
      return [420, 479];
    case 9:
      return [480, 539];
    case 10:
      return [540, 599];
    default:
      return [0, 59];
  }
};
export const Home = ({ onTakeExam }) => {
  const handleTakeExam = (key) => {
    const [start, end] = getStartEndIndex(key);
    onTakeExam(start, end);
  };
  return (
    <div style={{ textAlign: 'center', padding: '20px 16px' }}>
      <h2 style={{ marginBottom: 16 }}>CQIB Exams</h2>
      {listExam.map((ex) => (
        <Button
          key={`exam-${ex}`}
          variant="contained"
          fullWidth
          sx={{ marginTop: 2 }}
          onClick={() => handleTakeExam(ex)}
        >
          {`Exam ${ex}`}
        </Button>
      ))}
    </div>
  );
};
