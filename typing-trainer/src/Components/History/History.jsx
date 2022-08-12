import "firebase/compat/firestore";
import { db } from "../../firebaseConfig";
import {
  collection,
  getDocs,
  orderBy,
  limit,
  query,
  where,
} from "firebase/firestore";

import { useCollectionData } from "react-firebase-hooks/firestore";

import ExerciseCard from "./ExerciseCard";
import { useAuthState } from "react-firebase-hooks/auth";

export default function History({ auth }) {
  const [user] = useAuthState(auth);
  const exercisesRef = collection(db, "exercises");
  const q = query(exercisesRef, orderBy("createdAt", "desc"), limit(5));
  const [exercises] = useCollectionData(q, {
    idField: "id",
  });

  return (
    <div>
      <h3>History</h3>
      <ul>
        {exercises &&
          user &&
          exercises
            .filter((exercise) => {
              return exercise.user === user.displayName;
            })
            .map((exercise) => {
              return <ExerciseCard key={exercise.id} exercise={exercise} />;
            })}
      </ul>
    </div>
  );
}
