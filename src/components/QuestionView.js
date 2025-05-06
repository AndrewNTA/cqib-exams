import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
import { Alert, Button, Divider } from '@mui/material';
import './styles.css';
import { AppContext, INTERESTED_TAB, REMEMBERED_TAB } from '../App';
import { Question } from './Question';

export function QuestionView() {
  const [index, setIndex] = useState(0);
  const [showTranslate, setShowTranslate] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [capturedAnswer, setCapturedAnswer] = useState({});
  const { questions, tab } = useContext(AppContext);
  const currentTab = useRef(null);

  useEffect(() => {
    if (tab !== currentTab.current) {
      currentTab.current = tab;
      setIndex(0);
    }
  }, [tab]);

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

  const getQuestionList = useCallback(() => {
    if (tab === REMEMBERED_TAB) {
      return questions.filter((w) => w.isRemembered);
    }
    if (tab === INTERESTED_TAB) {
      return questions.filter((w) => w.isInterested);
    }
    return questions;
  }, [tab, questions]);

  const filterQuestions = useMemo(() => getQuestionList(), [getQuestionList]);
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

  if (
    !Boolean(filterQuestions) ||
    !filterQuestions.length ||
    !currentQuestion
  ) {
    return <p className="adr-center">No data found!!!</p>;
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
      {showAnswer && renderAlert()}
      <div className="adr-button-group">
        <Button variant="outlined" disabled={index === 0} onClick={goBack}>
          Prev
        </Button>
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
      </div>
    </div>
  );
}
