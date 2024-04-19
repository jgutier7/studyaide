import React, { useState, useEffect } from 'react';

const Timer = ({ duration }) => {
  const [percentage, setPercentage] = useState(100);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      const remainingTime = Math.max(0, duration - elapsedTime);
      const percentageCompleted = (elapsedTime / duration) * 100;
      setPercentage(percentageCompleted);

      if (remainingTime <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <div className="timer">
      <svg className="progress-ring" viewBox="0 0 100 100">
        <circle
          className="progress-ring__circle"
          strokeWidth="10"
          fill="transparent"
          r="40"
          cx="50"
          cy="50"
          style={{
            strokeDasharray: 251.2, // circumference of a circle with radius 40
            strokeDashoffset: 251.2 - (percentage / 100) * 251.2
          }}
        />
      </svg>
    </div>
  );
};

export default Timer;