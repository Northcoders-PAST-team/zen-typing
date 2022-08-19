import { useEffect, Fragment } from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Timer({
  correctWords,
  startCounting,
  setTimeElapsed,
  timeElapsed,
  undetected,
}) {
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
  }, [startCounting, timeElapsed]);

  const minutes = timeElapsed / 60;

  return (
    <div
      className={timeElapsed ? "timer-container-started" : "timer-container"}
    >
      <Fragment>
        <div className="time-elapsed-and-speed">
          <p>Time: {timeElapsed} secs</p>
          <p>Speed: {(correctWords / minutes || 0).toFixed(2)} WPM </p>
          <p>
            {!undetected
              ? ""
              : undetected === 1
              ? `We couldn't detect you once during the exercise`
              : `We couldn't detect you ${undetected} times during the exercise.`}
          </p>
        </div>

        <br />
      </Fragment>
    </div>
  );
}
