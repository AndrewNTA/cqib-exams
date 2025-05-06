import React, { useEffect, useRef, useState } from 'react';
import { Home } from './components/Home';
import { useLazyQuery, gql } from '@apollo/client';
import { Menu } from './components/Menu';

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

export const HOME_TAB = 'home';
export const REMEMBERED_TAB = 'remembered';
export const INTERESTED_TAB = 'interested';
export const PRACTICE_TAB = 'practice';

export const AppContext = React.createContext({
  questions: null,
  tab: null,
  updateQuestions: () => {},
});

function App() {
  const skipNumber = useRef(null);
  // Flag to check should add to product list
  const flag = useRef(null);
  const [getQuestions, { data }] = useLazyQuery(QUESTIONS_QUERY);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(HOME_TAB);

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

  const handleChangeTab = (selectedTab) => {
    setTab(selectedTab);
  };

  if (loading) {
    return <p className="adr-center">Loading...</p>;
  }
  return (
    <div className="App">
      <AppContext.Provider
        value={{
          questions,
          tab,
          updateQuestions: (newQuestions) => setQuestions(newQuestions),
        }}
      >
        <Home />
        <Menu onChange={handleChangeTab} />
      </AppContext.Provider>
    </div>
  );
}

export default App;
