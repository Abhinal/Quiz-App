import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import { fetchQuizQuestions, QuestionState } from './API';
import { GlobalStyle, Wrapper } from './App.styles';
import Timer from './components/Timer';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUES = 5;

function App() {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [examOver, setExamOver] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [timeTaken, setTimeTaken] = useState(0);
  
  const startTrivia = async () => {
    setLoading(true);
    setExamOver(false);
    setShowResult(false);

    const newQuestions = await fetchQuizQuestions();

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setTimeTaken(0);
    setLoading(false);

  }

  const verifyAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!examOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if(correct)
        setScore(prev => prev+1);
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  }

  const nextQuestion = () => {
    const nextQuestion = number + 1;

    if(nextQuestion === TOTAL_QUES) {
      setShowResult(true);
      setExamOver(true);
    } else {
      setNumber(nextQuestion);
    }
  }



  return (
    <>
      <GlobalStyle/>
      <Wrapper>
        <h1>QUIZ APP</h1>
        {!showResult && examOver ? (
          <>
            <h2>
              Duration : 1 min
              <br/>
              Total Questions : 5
            </h2>
            <button className='start' onClick={startTrivia}>
              Start
            </button>
          </>
        ): null}
        
        {!showResult && !examOver && <p className='score'>Score: {score}</p>}
        {!showResult && loading && <p>Loading Question...</p>}
        {!showResult && !loading && !examOver && ( <>
            <Timer duration={60} setShowResult={setShowResult} setTimeTaken={setTimeTaken} />
            <QuestionCard 
              quesNum={number+1} 
              totalNum={TOTAL_QUES}
              question={questions[number]?.question}
              answers={questions[number]?.answers}
              useranswer={userAnswers ? userAnswers[number] : undefined}
              callback={verifyAnswer}
            />
          </>
          )}
        {!showResult && !examOver && !loading && userAnswers.length===number+1 && 
          <button className='next' onClick={nextQuestion}>{number !== TOTAL_QUES-1 ? "Next" : "Submit"}</button>
        }

        {showResult && <>
                        <h2>
                          Your Score : {score}/{TOTAL_QUES}
                          <br/>
                          Time Taken : {timeTaken} secs
                        </h2>
                        <button className='start' onClick={startTrivia}>
                          Re-Attempt
                        </button>
                       </>}

      </Wrapper>
    </>
  );
}

export default App;
