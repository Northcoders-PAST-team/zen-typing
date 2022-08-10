import "firebase/compat/firestore";
import { db } from "../../firebaseConfig";
import { collection } from "firebase/firestore";

import { useCollectionData } from "react-firebase-hooks/firestore";

import ExerciseCard from "./ExerciseCard";

export default function History() {
  const exercisesRef = collection(db, "exercises");
  const [exercises] = useCollectionData(exercisesRef, {
    idField: "id",
  });

  return (
    <div>
      <h3>History</h3>
      <ul>
        {exercises &&
          exercises.map((exercise) => {
            return <ExerciseCard key={exercise.id} exercise={exercise} />;
          })}
      </ul>
    </div>
  );
}
