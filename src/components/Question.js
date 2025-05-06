import React from 'react';
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

export const Question = ({
  questionId,
  questionText,
  questionTranslate,
  answers,
  showTranslate,
  selectedAnswer,
  onSelect,
}) => {
  const questionKey = `question-${questionId}`;
  const displayedQuestion = showTranslate ? questionTranslate : questionText;
  return (
    <FormControl key={questionKey}>
      <div
        id={`${questionKey}-label`}
        style={{
          fontSize: 18,
          fontWeight: 500,
        }}
      >
        {displayedQuestion}
      </div>
      <RadioGroup
        name={`${questionKey}-radio-group`}
        sx={{
          marginLeft: 1,
        }}
      >
        {answers?.map((a) => {
          const displayedAnswer = showTranslate ? a.labelTranslate : a.label;
          return (
            <FormControlLabel
              key={`${questionId}-${a.value}`}
              value={a.value}
              checked={a.value === selectedAnswer}
              control={<Radio />}
              label={displayedAnswer}
              onClick={() => onSelect(questionId, a.value)}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};
