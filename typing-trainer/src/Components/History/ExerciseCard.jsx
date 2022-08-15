import "../Home/Home.scss";

export default function ExerciseCard(props) {
  const {
    uid,
    user,
    createdAt,
    time,
    wpm,
    difficulty,
    paragraph,
    accuracy,
    neutral,
  } = props.exercise;

  const dateObj = new Date(createdAt.seconds * 1000);
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const hour = dateObj.getHours();
  let minute = 0;
  if (dateObj.getMinutes() < 10) {
    minute = "0" + dateObj.getMinutes();
  } else {
    minute = dateObj.getMinutes();
  }

  return (
    <div className="history-card">
      <p>User: {user}</p>
      <p>
        Date: {day}/{month}/{year} {hour}:{minute}
      </p>
      <p>Time: {time}</p>
      <p>WPM: {wpm} </p>
      <p>Accuracy {(accuracy * 100).toFixed(2)}% </p>
      <p>Difficulty:{difficulty}</p>
      <p>Neutral: {neutral.toFixed(2)}%</p>
    </div>
  );
}
