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
  let q = undefined;
  if (user) {
    q = query(
      exercisesRef,
      where("user", "==", user.displayName),
      orderBy("createdAt", "desc"),
      limit(5)
    );
  } else {
    q = query(exercisesRef, orderBy("createdAt", "desc"), limit(5));
  }

  const [exercises] = useCollectionData(q, {
    idField: "id",
  });

  return (
    <div className="historyContainer">
      <h3>History</h3>
      <div className="history">
        {exercises &&
          user &&
          exercises.map((exercise, index) => {
            return <ExerciseCard key={index} exercise={exercise} />;
          })}
      </div>
    </div>
  );
}
