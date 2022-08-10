import { useEffect, useState } from "react";

export default function Timer({
  correctWords,
  startCounting,
  setTimeElapsed,
  timeElapsed,
  emotionLog,
}) {
  // const { correctWords, startCounting, setTimeElapsed, timeElapsed} } = props;

  useEffect(() => {
    let id;
    if (startCounting) {
      id = setInterval(() => {
        setTimeElapsed((oldTime) => {
          return oldTime + 1;
        });
      }, 1000);
    }
    return () => {
      clearInterval(id);
    };
  }, [startCounting]);

  const minutes = timeElapsed / 60;

  return (
    <div>
      <p>Time: {timeElapsed}</p>
      <p>Speed: {(correctWords / minutes || 0).toFixed(2)} WPM</p>
      <p>
        Neutral: {emotionLog.neutral}, Happy:{emotionLog.happy}, Disgusted:
        {emotionLog.disgusted}, Sad: {emotionLog.sad}, Angry: {emotionLog.angry}
        , Surprised: {emotionLog.surprised}
      </p>
    </div>
  );
}
