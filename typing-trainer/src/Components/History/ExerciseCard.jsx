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
    <div>
      <p>
        uid: {uid} | User: {user} | Date: {day}/{month}/{year} {hour}:{minute} |
        Time: {time} | WPM: {wpm} | Accuracy {accuracy * 100}% | Difficulty:{" "}
        {difficulty} | Paragraph: {paragraph} | Neutral: {neutral}%
      </p>
    </div>
  );
}
