import React, { useContext, useMemo, useState } from 'react';
import { Alert, Button, Divider } from '@mui/material';
import './styles.css';
import { AppContext } from '../App';
import { Question } from './Question';

const checkResult = (allQuestions, capturedAnswer) => {
  return allQuestions.reduce((ass, cur) => {
    if (capturedAnswer[cur.id] === cur.correctAnswer) {
      return ass + 1;
    }
    return ass;
  }, 0);
};

export function ExamView({ start, end, onGoHome }) {
  const [index, setIndex] = useState(0);
  const [showTranslate, setShowTranslate] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [capturedAnswer, setCapturedAnswer] = useState({});
  const [result, setResult] = useState(null);
  const { questions } = useContext(AppContext);

  const goNext = () => {
    setIndex(() => index + 1);
    setShowTranslate(false);
    setShowAnswer(false);
  };

  const goBack = () => {
    setIndex(() => index - 1);
    setShowTranslate(false);
    setShowAnswer(false);
  };

  const handleSelect = (questionId, answerValue) => {
    const newCapturedAnswer = { ...capturedAnswer };
    newCapturedAnswer[questionId] = answerValue;
    setCapturedAnswer(newCapturedAnswer);
  };

  const handleTranslate = () => {
    setShowTranslate((showTranslate) => !showTranslate);
  };

  const handleCheckAnswer = () => {
    setShowAnswer((showAnswer) => !showAnswer);
  };

  const handleSubmit = () => {
    const yourResult = checkResult(filterQuestions, capturedAnswer);
    setResult(yourResult);
  };

  const filterQuestions = useMemo(() => {
    const allQuestion = questions ?? [];
    return allQuestion.slice(start, end);
  }, [questions, start, end]);

  const currentQuestion = filterQuestions[index];

  const renderAlert = () => {
    const message = `Correct answer is answer number ${currentQuestion.correctAnswer}`;
    const selectedAnswer = capturedAnswer[currentQuestion.id];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    return (
      <div style={{ marginBottom: 16 }}>
        {isCorrect ? (
          <Alert severity="success">{message}</Alert>
        ) : (
          <Alert severity="error">{message}</Alert>
        )}
      </div>
    );
  };

  const renderResult = () => {
    const score = ((result / filterQuestions.length) * 100).toFixed(2);
    const message = `Your score is ${score} (${result} / ${filterQuestions.length})`;
    if (score >= 75)
      return (
        <div style={{ marginBottom: 16 }}>
          <Alert severity="success">{`Passed! ${message}`}</Alert>
        </div>
      );
    return (
      <div style={{ marginBottom: 16 }}>
        <Alert severity="error">{`Failed! ${message}`}</Alert>
      </div>
    );
  };

  if (
    !Boolean(filterQuestions) ||
    !filterQuestions.length ||
    !currentQuestion
  ) {
    return (
      <div style={{ padding: '20px 16px' }}>
        <p className="adr-center">No data found!!!</p>
        <Button
          variant="contained"
          fullWidth
          sx={{ marginTop: 2 }}
          onClick={onGoHome}
        >
          Back to Home page
        </Button>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="adr-card">
        <Question
          questionId={currentQuestion.id}
          questionText={currentQuestion.questionText}
          questionTranslate={currentQuestion.questionTranslate}
          answers={currentQuestion.answers}
          showTranslate={showTranslate}
          selectedAnswer={capturedAnswer[currentQuestion.id]}
          onSelect={handleSelect}
        />
      </div>
      {(result !== null || showAnswer) && renderAlert()}
      {result !== null && renderResult()}
      <div className="adr-button-group">
        <Button variant="outlined" disabled={index === 0} onClick={goBack}>
          Prev
        </Button>
        <div className="adr-index-total">
          {`${index + 1} / ${filterQuestions.length}`}
        </div>
        <Button
          variant="contained"
          disabled={index === filterQuestions.length - 1}
          onClick={goNext}
        >
          Next
        </Button>
      </div>
      <Divider />
      <div className="adr-row">
        <Button
          variant="contained"
          fullWidth
          sx={{ marginTop: 2 }}
          onClick={handleTranslate}
        >
          Translate
        </Button>
        <Button
          variant="contained"
          fullWidth
          sx={{ marginTop: 2 }}
          onClick={handleCheckAnswer}
        >
          Check answer
        </Button>
        <Button
          variant="contained"
          fullWidth
          sx={{ marginTop: 2 }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          fullWidth
          sx={{ marginTop: 2 }}
          onClick={onGoHome}
        >
          Back to Home page
        </Button>
      </div>
    </div>
  );
}
