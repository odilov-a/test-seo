import React, { useState, useEffect } from 'react';

interface NumberCounterProps {
  startValue: number;
  endValue: number;
  triggerAnimation: boolean;
}

const NumberCounter: React.FC<NumberCounterProps> = ({ startValue, endValue, triggerAnimation }) => {
  const [count, setCount] = useState(startValue);
  const [intervalTime, setIntervalTime] = useState(50); // Default interval time

  useEffect(() => {
    const difference = endValue - startValue;
    const duration = 3000; // 5 seconds in milliseconds
    const interval = duration / difference;

    if (triggerAnimation && count < endValue) {
      const intervalId = setInterval(() => {
        setCount(prevCount => {
          const nextCount = prevCount + 1;
          return nextCount > endValue ? endValue : nextCount;
        });
      }, interval);

      setIntervalTime(interval);

      return () => clearInterval(intervalId); // Cleanup the interval on component unmount
    }
  }, [count, endValue, startValue, triggerAnimation]);

  return (
    <>{count}</>
  );
};

export default NumberCounter;
