import { useEffect, useState } from "react";

export default function Timer(props) {
  const {
    correctWords,
    startCounting,
    timeElapsed,
    setTimeElapsed,
    speed,
    setSpeed,
  } = props;

  useEffect(() => {
    let id;
    if (props.startCounting) {
      id = setInterval(() => {
        setTimeElapsed((oldTime) => {
          return oldTime + 1;
        });
        console.log(correctWords);
        console.log(timeElapsed);
        setSpeed((correctWords / (timeElapsed / 60) || 0).toFixed(2));
      }, 1000);
    }
    return () => {
      clearInterval(id);
    };
  }, [startCounting]);

  // const minutes = timeElapsed / 60;

  return (
    <div>
      <p>Time: {timeElapsed}</p>
      <p>Speed: {speed} WPM</p>
    </div>
  );
}
