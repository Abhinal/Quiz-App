import React, { useState, useEffect } from 'react';

type TimerProps = {
  duration: number;
  setShowResult: React.Dispatch<React.SetStateAction<boolean>>; 
  setTimeTaken: React.Dispatch<React.SetStateAction<number>>; 
};

const Timer: React.FC<TimerProps> = ({ duration, setShowResult, setTimeTaken }) => {
  const [timeRemaining, setTimeRemaining] = useState(duration);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
      setTimeTaken((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeRemaining === 0) {
        setShowResult(true);
    }
  }, [timeRemaining]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div>
      <p>Time left: {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</p>
    </div>
  );
};

export default Timer;
