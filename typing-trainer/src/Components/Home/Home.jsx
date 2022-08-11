import { useState, Fragment, useEffect } from "react";

import "./Home.scss";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import React from "react";

//importing database
import { db } from "../../firebaseConfig";
import {
  collection,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";


//importing functions
import { doc, onSnapshot } from "firebase/firestore";

import Face from "../Face/Face";
import Word from "./Word";
import Timer from "./Timer";
import History from "../History/History";

const choices = ["HTML", "CSS", "javascript", "python"];


export default function Home() {
  // 1. Use state to hold the userInput, linked to the text input box
  // 2. Use state to track what number in the word array the user is on, start at 0 and increment everytime they type a space
  // 3. Use state to track wether each word was spelled correctly or incorrectly e. [true, true, false, true]
  const [userInput, setUserInput] = useState("");
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [correctWordArray, setCorrectWordArray] = useState([]);

  const [startCounting, setStartCounting] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [speed, setSpeed] = useState(0);

  const [emotionLog, setEmotionLog] = useState({
    neutral: 0,
    happy: 0,
    surprised: 0,
    angry: 0,
    sad: 0,
    disgusted: 0,
  });

  ///testing

  // let primaryEmotion = Object.keys(currentEmotions).reduce((a, b) =>
  //   currentEmotions[a] > currentEmotions[b] ? a : b
  // );

  const [difficulty, setDifficulty] = useState("easy");
  const [id, setId] = useState("1");

  const [paragraph, setParagraph] = useState("");

  const colRef = collection(db, "paragraphs");
  // const exercisesRef = collection(db, "exercises");
  const exercisesRef = collection(db, "exercises");

  //React.MouseEvent<HTMLButtonElement, MouseEvent>
  function selectHandler(e) {
    setId(String(Math.floor(Math.random() * 10 + 1)));
    setDifficulty(e.target.value);
  }

  useEffect(() => {
    onSnapshot(
      doc(db, difficulty, id),
      (docSnap) => {
        if (docSnap.exists()) {
          setParagraph(docSnap.data().text);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }, [difficulty, id]);

  // 4. Make a word cloud which is a paragraph of words seperated by spaces, then split it into an array
  // const cloud =
  //   "apple banana carrot dog elephant fudge ghana hello iguana jacket king llama monkey nose oval potato queen rat steam tomato umbrella very well xylophone young zoom".split(
  //     " "
  //   );

  let cloud = String(paragraph).split(" ");
  cloud = JSON.stringify(cloud);

  if (cloud === JSON.stringify(["undefined"])) {
    if (difficulty === "easy") {
      setParagraph(
        "Books enable you to expose yourself to new ideas and new ways to achieve your goals. They enable you to think outside the box."
      );
    } else if (difficulty === "medium") {
      setParagraph(
        "Things that used to take hours to complete can now be completed in a matter of minutes because of technology. Everything is just a click away, including banking, sending e-mail, assignments, and even shopping."
      );
    } else {
      setParagraph(
        "def prepend_path(self, name: str, paths: List[str]) -> None: old_val = self.env.get(name)         paths = [p for p in paths if isdir(p)]         if not paths:  return  if old_val is not None: new_val = ':'.join(itertools.chain(paths, [old_val])) else: new_val = ':'.join(paths)     self.env[name] = new_val ~ `! 1@ 2# 3$ 4% 5^ 6& 7* 8( 9) 0_ -+ =Backspace"
      );
    }
  }
  cloud = JSON.parse(cloud);

  // 9. A handler function for the onChange
  // If the keystroke was a space then assume the user has attempted the active word, so increment the activeWordIndex and reset the userInput
  // Log in the correctWordArray a true if the attempt matches the paragraph array item at activeWordIndex, a false otherwise.
  // If the keystroke wasn't a space then they're still typing the active word, so just setUserInput(value).
  const processInput = (value) => {
    if (!startCounting) {
      setStartCounting(true);
    }

    //If they misspelled the last word then this one will catch them when they try to
    if (activeWordIndex === cloud.length) {
      setStartCounting(false);
      setUserInput("FINISHED");

      return;
    }
    // after a word
    if (value.endsWith(" ")) {
      setActiveWordIndex((index) => index + 1);
      setUserInput("");

      setCorrectWordArray((data) => {
        const word = value.trim();
        const newResult = [...data];
        newResult[activeWordIndex] = word === cloud[activeWordIndex];

        return newResult;
      });
    } else if (
      //   activeWordIndex === cloud.length - 1 &&
      //   userInput === cloud[activeWordIndex].slice(0, -1) &&
      value === cloud[cloud.length - 1]
    ) {
      setActiveWordIndex((index) => index + 1);
      setUserInput("");

      setCorrectWordArray((data) => {
        const word = value.trim();
        const newResult = [...data];
        newResult[activeWordIndex] = word === cloud[activeWordIndex];

        return newResult;
      });
      setStartCounting(false);
      setUserInput("FINISHED");


      console.log("timeElapsed is " + timeElapsed);

      // const speed =
      //   correctWordArray.filter(Boolean).length / (timeElapsed / 60).toFixed(2);

      addDoc(exercisesRef, {
        createdAt: Timestamp.fromDate(new Date()),
        time: timeElapsed,
        wpm: speed,
      })
        .then((docRef) => {
          console.log("Document has been added successfully)");
        })
        .catch((error) => {
          console.log("ERROR IS " + error);
        });

      setFinished(userInput === "FINISHED");

      return;
    } else {
      setUserInput(value);
    }
  };

  return (
    <div className="home">
      <Timer
        startCounting={startCounting}
        correctWords={correctWordArray.filter(Boolean).length}
        timeElapsed={timeElapsed}
        setTimeElapsed={setTimeElapsed}
        speed={speed}
        setSpeed={setSpeed}
        emotionLog={emotionLog}
      />
      <label htmlFor="difficulty">
        {" "}
        Difficulty Level
        <select name="difficulty" id="difficulty" onChange={selectHandler}>
          {/* <option>choose difficulty level</option> */}
          <option value="easy">easy</option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
        </select>
      </label>

      {/* 5. The box for the sample paragraph the user must type, populated by Word components. */}
      <Fragment>
        <div className="target-paragraph">
          <CssBaseline />
          <Container maxWidth="sm">
            <Box
              sx={{
                borderLeft: 1,
                borderRight: 1,
                borderRadius: "16px",
                mt: "1.5rem",
                bgcolor: "#black",
                height: "20vh",
                color: "white",
                fontFamily: "Georgia",
              }}
            >
              {/* 6. Map over our paragraph array, for each word render a Word component and pass it props of what the word is, wether it's the active word and if it's correct */}
              {/* The word is active if it's index in the array is the same as the activeWordIndex state */}
              {/* The word is correct if it's position in the correctWordArray is true, false if false. */}
              <p>
                {cloud.map((word, index) => {
                  return (
                    <Word
                      text={word}
                      active={index === activeWordIndex}
                      correct={correctWordArray[index]}
                    />
                  );
                })}
              </p>
            </Box>
          </Container>
        </div>
      </Fragment>

      <Face
        startCounting={startCounting}
        setEmotionLog={setEmotionLog}
        emotionLog={emotionLog}
        timeElapsed={timeElapsed}
        // primaryEmotion={primaryEmotion}
      />

      <p>{userInput}</p>
      {/* 0. A text input box with value linked to the userInput state, onChange sets the userInput state and hence updates this value*/}
      <TextField
        type="text"
        value={userInput}
        onChange={(e) => {
          processInput(e.target.value);
        }}
        sx={{
          borderTop: 1,
          borderBottom: 1,
          borderRadius: "16px",
          mt: "21rem",
          mb: "15rem",
          width: 450,
          bgcolor: "white",
          color: "white",
          input: { color: "black" },
        }}
        id="filled-basic"
        label="Type here"
        variant="filled"
        InputLabelProps={{
          style: { color: "black" },
        }}
      />
      <History />
    </div>
  );
}
