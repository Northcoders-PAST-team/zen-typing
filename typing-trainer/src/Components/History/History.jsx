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
  console.log(user, "<<user");
  const exercisesRef = collection(db, "exercises");
  const q = query(
    exercisesRef,
    where("user", "==", "tom reece"),
    orderBy("createdAt", "desc"),
    limit(5)
  );
  const [exercises] = useCollectionData(q, {
    idField: "id",
  });

  //useEffect with user in dependency array and store exercises in state

  return (
    <div>
      {console.log("render history component")}
      {console.log(exercises)}
      {console.log(user)}

      <h3>History</h3>
      <div className="history">
        {exercises &&
          user &&
          exercises
            // .filter((exercise) => {
            //   return exercise.user === user.displayName;
            // })
            // .filter((exercise, index) => {
            //   return index <= 4;
            // })
            .map((exercise, index) => {
              return <ExerciseCard key={index} exercise={exercise} />;
            })}
      </div>
    </div>
  );
}
