export default function ExerciseCard(props) {
  const { user, createdAt, time, wpm } = props.exercise;

  const dateObj = new Date(createdAt.seconds * 1000);
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const hour = dateObj.getHours();
  const minute = dateObj.getMinutes();

  return (
    <div>
      <p>
        User: {user} | Date: {day}/{month}/{year} {hour}:{minute} | Time: {time}{" "}
        | WPM: {wpm}
      </p>
    </div>
  );
}
