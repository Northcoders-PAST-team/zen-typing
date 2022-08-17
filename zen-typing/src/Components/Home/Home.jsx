import { useState, Fragment, useEffect } from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import Button from "@mui/material/Button";

import "./Home.scss";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import React from "react";
import SideNav from "../SideNav/SideNav";
// import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useSearchParams } from "react-router-dom";

import { UserContext } from "../User/UserContext";
import { useContext } from "react";
import Loading from "../Loading/Loading";
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
  onSnapshot,
} from "firebase/firestore";

import Face from "../Face/Face";
import Word from "./Word";
import Timer from "./Timer";
import History from "../History/History";
import { OptionUnstyled } from "@mui/base";
import { experimentalStyled } from "@mui/material";

export default function Home() {
  // const [user] = useAuthState(auth);

  const { user, auth } = useContext(UserContext);
  // 1. Use state to hold the userInput, linked to the text input box
  // 2. Use state to track what number in the word array the user is on, start at 0 and increment everytime they type a space
  // 3. Use state to track wether each word was spelled correctly or incorrectly e. [true, true, false, true]
  const [userInput, setUserInput] = useState("");
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [correctWordArray, setCorrectWordArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
  const [undetected, setUndetected] = useState(0);

  const [search, setSearch] = useSearchParams();
  const level = search.get("level");
  const id = search.get("id");

  const [searchLevel, setSearchLevel] = useState(level || "easy");
  const [searchId, setSearchId] = useState(id || "1");
  const [request, setRequest] = useState({ level: searchLevel, id: searchId });

  // const [request, setRequest] = useState({ level: "easy", id: "1" });

  const [difficulty, setDifficulty] = useState("easy");
  const [keyboard, setKeyboard] = useState(true);
  const [hiddenVideo, setHiddenVideo] = useState(false);
  const [iD, setID] = useState("1");

  const [calm, setCalm] = useState(true);

  const [neutral, setNeutral] = useState();

  const [happy, setHappy] = useState();
  const [surprised, setSurprised] = useState();
  const [angry, setAngry] = useState();
  const [sad, setSad] = useState();
  const [disgusted, setDisgusted] = useState();

  let currentEmotions = {
    happy: happy,
    surprised: surprised,
    angry: angry,
    disgusted: disgusted,
    sad: sad,
    neutral: neutral,
  };

  let primaryEmotion = !currentEmotions
    ? "neutral"
    : Object.keys(currentEmotions).reduce((a, b) =>
        currentEmotions[a] > currentEmotions[b] ? a : b
      );

  const labels = ["neutral", "happy", "disgusted", "sad", "angry", "surprised"];

  const data = {
    labels,
    datasets: [
      {
        label: "Emotion Feedback",
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
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const [paragraph, setParagraph] = useState("");

  const colRef = collection(db, "paragraphs");
  // const exercisesRef = collection(db, "exercises");
  const exercisesRef = collection(db, "exercises");

  function selectId(e) {
    if (e.target.value === "ID") {
      // setID(String(Math.floor(Math.random() * 10 + 1)));
      setID("1");
    } else {
      setID(e.target.value);
    }
  }
  //React.MouseEvent<HTMLButtonElement, MouseEvent>

  function selectDifficulty(e) {
    // setId(String(Math.floor(Math.random() * 10 + 1)));
    if (e.target.value === "choice") {
      setDifficulty("easy");
    } else {
      setDifficulty(e.target.value);
    }
  }

  //just have to add 6 lines to reset startCounting, activeWordIndex, emotionLog, timeElapsed and correctWordArray.
  function generate() {
    setRequest({ level: difficulty, id: iD });
    setSearch({ level: difficulty, id: iD });
    setActiveWordIndex(0);
    setEmotionLog({
      neutral: 0,
      happy: 0,
      surprised: 0,
      angry: 0,
      sad: 0,
      disgusted: 0,
    });
    setTimeElapsed(0);
    setCorrectWordArray([]);
    setUserInput("");
    setKeyboard(true);
    setHiddenVideo(false);
    setStartCounting(false);
  }

  useEffect(() => {
    setIsLoading(true);
    onSnapshot(
      doc(db, request.level, request.id),
      (docSnap) => {
        if (docSnap.exists()) {
          setParagraph(docSnap.data().text);
          setIsLoading(false);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          setIsLoading(false);
        }
      },
      (err) => {
        console.log(err);
        setIsLoading(false);
      }
    );
  }, [request]);

  let cloud = String(paragraph).split(" ");
  cloud = JSON.stringify(cloud);

  if (cloud === JSON.stringify(["undefined"])) {
    if (difficulty === "easy") {
      setParagraph("A JavaScript array is an ordered collection of data");
    } else if (difficulty === "medium") {
      setParagraph(
        "In computer science, zero indexing means that we start counting ordered collections from zero. All JavaScript arrays are zero-indexed"
      );
    } else {
      setParagraph(
        "All arrays have a .length property indicating the number of items present inside the array. In other languages, arrays and ordered collections of data have limitations on the amount of data they can store"
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
      setHiddenVideo(false);
    }

    //If they misspelled the last word then this one will catch them when they try to
    if (activeWordIndex === cloud.length) {
      setStartCounting(false);
      setUserInput("FINISHED");
      setKeyboard(false);
      setHiddenVideo(true);

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
      //on completion
      activeWordIndex === cloud.length - 1 &&
      value.length === cloud[cloud.length - 1].length
    ) {
      setActiveWordIndex((index) => index + 1);

      setCorrectWordArray((data) => {
        const word = value.trim();
        const newResult = [...data];
        newResult[activeWordIndex] = word === cloud[activeWordIndex];
        return newResult;
      });
      setStartCounting(false);

      setKeyboard(false);
      setHiddenVideo(true);
      console.log(lastWord === cloud[cloud.length - 1]);

      console.log(lastWord);
      let arr = [...correctWordArray, lastWord === cloud[cloud.length - 1]];
      console.log(correctWordArray);
      console.log(arr);

      if (user) {
        addDoc(exercisesRef, {
          uid: user.uid,
          user: user.displayName || user.email,
          createdAt: Timestamp.fromDate(new Date()),
          time: timeElapsed,
          difficulty: difficulty,
          paragraph: paragraph,

          wpm: (arr.filter(Boolean).length / (timeElapsed / 60) || 0).toFixed(
            2
          ),
          accuracy: arr.filter(Boolean).length / cloud.length,

          neutral: ((emotionLog.neutral - 1) / timeElapsed) * 100,
          happy: (emotionLog.happy / timeElapsed) * 100,
          sad: (emotionLog.sad / timeElapsed) * 100,
          surprised: (emotionLog.surprised / timeElapsed) * 100,
          disgusted: (emotionLog.disgusted / timeElapsed) * 100,
          angry: (emotionLog.angry / timeElapsed) * 100,
        })
          .then((docRef) => {
            console.log("Document has been added successfully)");
          })
          .catch((error) => {
            console.log("ERROR IS " + error);
          });
      }

      return;
    } else {
      //in the middle of a word
      setUserInput(value);
    }
  };

  const [lastWord, setLastWord] = useState("");

  function lastWordHandle({ keyCode, key }) {
    if (
      [
        ...Array.from(
          {
            length: 26,
          },
          (v, k) => k + 65
        ),
        187,
        188,
        189,
        190,
        191,
        192,
        219,
        220,
        221,
        222,
      ].includes(keyCode)
    ) {
      setLastWord((current) => (current += key));
    } else if (keyCode === 8) {
      setLastWord((current) => current.slice(0, -1));
    } else if (keyCode === 32) {
      setLastWord("");
    }
  }

  const [copyMsg, setCopyMsg] = useState(false);

  function copyLink() {
    navigator.clipboard.writeText(
      `http://localhost:3000/?level=${request.level}&id=${request.id}`
    );

    setCopyMsg(true);

    setTimeout(() => {
      setCopyMsg(false);
    }, 1000);
  }
  if (isLoading) {
    <Loading />;
  } else {
    return (
      <div className="home">
        <div className="exercise-area">
          <Face
            startCounting={startCounting}
            setEmotionLog={setEmotionLog}
            emotionLog={emotionLog}
            timeElapsed={timeElapsed}
            // primaryEmotion={primaryEmotion}
            setUndetected={setUndetected}
            undetected={undetected}
            hiddenVideo={hiddenVideo}
            setHiddenVideo={setHiddenVideo}
            data={data}
            calm={calm}
            setCalm={setCalm}
            neutral={neutral}
            setNeutral={setNeutral}
            happy={happy}
            setHappy={setHappy}
            surprised={surprised}
            setSurprised={setSurprised}
            angry={angry}
            setAngry={setAngry}
            sad={sad}
            setSad={setSad}
            disgusted={disgusted}
            setDisgusted={setDisgusted}
          />

          <Fragment>
            <div className="target-paragraph">
              <CssBaseline />
              <Container maxWidth="md">
                <Box
                  sx={{
                    borderRadius: "10px",
                    mt: "1.5rem",
                    bgcolor: "rgba(255,255,255, 0.5)",
                    height: "fit-content",
                    color: "black",
                    fontFamily: "Monospace",
                    padding: "10px;",
                    width: "800px",
                    fontSize: "26px",
                  }}
                >
                  {/* 6. Map over our paragraph array, for each word render a Word component and pass it props of what the word is, wether it's the active word and if it's correct */}
                  {/* The word is active if it's index in the array is the same as the activeWordIndex state */}
                  {/* The word is correct if it's position in the correctWordArray is true, false if false. */}
                  <p>
                    {cloud.map((word, index) => {
                      return (
                        <Word
                          key={index}
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
          {keyboard ? (
            <TextField
              className="user-paragraph"
              type="text"
              value={userInput}
              autoFocus
              onChange={(e) => {
                processInput(e.target.value);
              }}
              onKeyDown={lastWordHandle}
              sx={{
                fontFamily: "Monospace",
                borderRadius: "10px",
                mt: "1rem",
                mb: "1rem",
                width: "fit-content",
                bgcolor: "rgba(255,255,255, 0.5)",
                color: "white",
                input: { color: "black" },
                textAlign: "center",
              }}
              inputProps={{
                autoComplete: "off",
              }}
              id="filled-basic"
              placeholder="Type here"
              variant="filled"
              InputLabelProps={{
                style: { color: "black" },
              }}
            />
          ) : null}
        </div>

        <div className="side-menu">
          <SideNav />
        </div>

        {/* 5. The box for the sample paragraph the user must type, populated by Word components. */}

        {/* 0. A text input box with value linked to the userInput state, onChange sets the userInput state and hence updates this value*/}
        <div className="right-menu">
          <div className="hide-emotion-and-emotion">
            <Button
              className="activate"
              onClick={() => {
                setHiddenVideo(hiddenVideo ? false : true);
              }}
              variant="contained"
              sx={{
                width: "300px",
              }}
            >
              {hiddenVideo
                ? "activate face recognition"
                : "deactivate face recognition"}
            </Button>
            <div className="current-emotion-container">
              <p className="currently">Currently </p>
              <div className="current-emotion-box">
                <p className="current-emotion-status">
                  <strong>
                    <div
                      className={
                        hiddenVideo ? "awaiting-input" : primaryEmotion
                      }
                    >
                      {hiddenVideo ? " awaiting input" : ` ${primaryEmotion}`}
                    </div>
                  </strong>
                </p>
              </div>
            </div>
          </div>

          <Timer
            startCounting={startCounting}
            correctWords={correctWordArray.filter(Boolean).length}
            timeElapsed={timeElapsed}
            setTimeElapsed={setTimeElapsed}
            speed={speed}
            setSpeed={setSpeed}
            emotionLog={emotionLog}
            undetected={undetected}
          />
          <div className="difficulty-form">
            <label htmlFor="difficulty">
              {" "}
              Difficulty
              <select
                name="difficulty"
                id="difficulty"
                onChange={selectDifficulty}
              >
                <option value="easy">easy</option>
                <option value="medium">medium</option>
                <option value="hard">hard</option>
              </select>
            </label>

            <label htmlFor="difficulty">
              Exercise
              <select name="difficulty" id="difficulty" onChange={selectId}>
                {[...Array(10)].map((o, i) => (
                  <option value={String(i + 1)} key={String(i + 1)}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </label>

            <button onClick={generate} className="btn btn-primary">
              Generate new
            </button>

            <button className="btn btn-success" onClick={copyLink}>
              {copyMsg ? "copied!" : "Share game link"}
            </button>
          </div>
          {user && <History auth={auth} />}
        </div>
      </div>
    );
  }
}
