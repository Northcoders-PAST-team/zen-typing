// import ".Timer.scss";

import { useEffect, Fragment } from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Timer({
  correctWords,
  startCounting,
  setTimeElapsed,
  timeElapsed,
  emotionLog,
  undetected,
}) {
  const labels = [
    "neutral",
    "happy",
    "disgusted",
    "sad",
    "angry",
    "surprised",
    "undetected",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Emotion Feedback",
        // data: labels.map((emotion) =>
        //   emotionLog[emotion]({ min: -1000, max: 1000 })
        // ),
        data: [
          (((emotionLog.neutral - 1) / timeElapsed || 0) * 100).toFixed(2),
          ((emotionLog.happy / timeElapsed || 0) * 100).toFixed(2),
          ((emotionLog.disgusted / timeElapsed || 0) * 100).toFixed(2),
          ((emotionLog.sad / timeElapsed || 0) * 100).toFixed(2),
          ((emotionLog.angry / timeElapsed || 0) * 100).toFixed(2),
          ((emotionLog.surprised / timeElapsed || 0) * 100).toFixed(2),
        ],

        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  speed,
  setSpeed,
}) {
  useEffect(() => {
    let id;
    if (startCounting) {
      id = setInterval(() => {
        setTimeElapsed((oldTime) => {
          return oldTime + 1;
        });
        setSpeed((correctWords / (timeElapsed / 60) || 0).toFixed(2));
      }, 1000);
    }
    return () => {
      clearInterval(id);
    };
  }, [startCounting, timeElapsed]);

  const minutes = timeElapsed / 60;

  return (
    <Fragment>
      <div className="feedback">
        <div className="time-elapsed-and-speed">
          <p>Time: {timeElapsed}</p>
          <p>Speed: {(correctWords / minutes || 0).toFixed(2)} WPM</p>
          <p>
            {!undetected
              ? ""
              : undetected === 1
              ? `We couldn't detect you once during the exercise`
              : `We couldn't detect you ${undetected} times during the exercise.`}
          </p>
        </div>
        <div className="face-feedback">
          <div className="bar-chart">
            <Doughnut data={data} />
          </div>
        </div>
        <br />
      </div>
    </Fragment>
    <div>
      <p>Time: {timeElapsed}</p>
      {/*<p>Speed: {(correctWords / minutes || 0).toFixed(2)} WPM</p>*/}
      <p>Speed: {speed} WPM</p>
      <p>
        Neutral: {emotionLog.neutral}, Happy:{emotionLog.happy}, Disgusted:
        {emotionLog.disgusted}, Sad: {emotionLog.sad}, Angry: {emotionLog.angry}
        , Surprised: {emotionLog.surprised}
      </p>
    </div>
  );
}
