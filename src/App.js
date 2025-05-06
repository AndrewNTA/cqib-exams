import React, { useEffect, useRef, useState } from 'react';
import { ExamView } from './components/ExamView';
import { useLazyQuery, gql } from '@apollo/client';
import { Home } from './components/Home';

const QUESTIONS_QUERY = gql`
  query Questions($skip: Int) {
    questions(first: 100, skip: $skip) {
      id
      questionText
      questionTranslate
      answers {
        ... on Answer {
          value
          label
          labelTranslate
        }
      }
      correctAnswer
    }
  }
`;

export const HOME_VIEW = 'home_view';
export const EXAM_VIEW = 'exam_view';

export const AppContext = React.createContext({
  questions: null,
});

function App() {
  const skipNumber = useRef(null);
  // Flag to check should add to product list
  const flag = useRef(null);
  const [getQuestions, { data }] = useLazyQuery(QUESTIONS_QUERY);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState(HOME_VIEW);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);

  useEffect(() => {
    if (!skipNumber.current && questions.length === 0) {
      setLoading(true);
      getQuestions({
        variables: { skip: 0 },
      });
      flag.current = true;
      skipNumber.current = 100;
    }
    if (flag.current && data?.questions.length) {
      setLoading(false);
      const newQuestions = [...questions, ...data.questions];
      setQuestions(newQuestions);
      flag.current = false;
    }
    if (Boolean(skipNumber.current) && data?.questions.length === 100) {
      getQuestions({
        variables: {
          skip: skipNumber.current,
        },
      });
      skipNumber.current = skipNumber.current + 100;
      flag.current = true;
    }
  }, [data?.questions, getQuestions, questions]);

  const handleTakeExam = (start, end) => {
    setView(EXAM_VIEW);
    setStartIndex(start);
    setEndIndex(end);
  };

  const handleGoHome = () => {
    setView(HOME_VIEW);
    setStartIndex(0);
    setEndIndex(0);
  };

  const renderView = () => {
    if (view === EXAM_VIEW)
      return (
        <ExamView start={startIndex} end={endIndex} onGoHome={handleGoHome} />
      );
    return <Home onTakeExam={handleTakeExam} />;
  };

  if (loading) {
    return <p className="adr-center">Loading...</p>;
  }
  return (
    <div className="App">
      <AppContext.Provider
        value={{
          questions,
        }}
      >
        {renderView()}
      </AppContext.Provider>
    </div>
  );
}

export default App;
