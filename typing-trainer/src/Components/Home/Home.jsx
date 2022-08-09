import { useState, Fragment } from "react";
import Face from "../Face/Face";
import Word from "./Word";
import Timer from "./Timer";
import "./Home.scss";
import axios from "axios";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import React from "react";

//importing database
import { db } from "../../firebaseConfig";

//importing functions
import {
  collection,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

//importing components
import SignIn from "../SignIn/SignIn";
import SignOut from "../SignOut/SignOut";

//importing react-firebase hooks
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

//importing authentication function
import { getAuth } from "firebase/auth";

const auth = getAuth();
// 7. Define the Word component, picking up the 3 props it's passed and destructure them, change className based on props
// function Word(props) {
//   const { text, active, correct } = props;
//   if (correct === true) {
//     return <span className="correct">{text} </span>;
//   }
//   if (correct === false) {
//     return <span className="incorrect">{text} </span>;
//   }
//   if (active === true) {
//     return <span className="active">{text} </span>;
//   }
//   return <span>{text} </span>;
// }

// 8. This is to stop each Word component from rerendering on every onChange rerender
// I guess it's like saying please remember this component and don't rerender it with everything else, only when it's specifically rerendered

export default function Home() {
  const [user] = useAuthState(auth);
  // 1. Use state to hold the userInput, linked to the text input box
  // 2. Use state to track what number in the word array the user is on, start at 0 and increment everytime they type a space
  // 3. Use state to track wether each word was spelled correctly or incorrectly e. [true, true, false, true]
  const [userInput, setUserInput] = useState("");
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [correctWordArray, setCorrectWordArray] = useState([]);
  const [startCounting, setStartCounting] = useState(false);

  const choices = ["HTML", "CSS", "javascript", "python"];
  const [paragraph, setParagraph] = useState("");
  const colRef = collection(db, "paragraphs");
  //React.MouseEvent<HTMLButtonElement, MouseEvent>
  function buttonHandler(e) {
    const difficulty = e.target.value;
    if (difficulty === "hard") {
      const docRef = doc(
        db,
        "paragraphs",
        choices[Math.floor(Math.random() * 4)]
      );
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          setParagraph(docSnap.data().paragraph);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      });
    } else if (difficulty === "medium") {
      const options = {
        method: "GET",
        url: "https://dinoipsum.com/api/?format=text&words=30&paragraphs=1",
      };

      axios
        .request(options)
        .then(function (response) {
          setParagraph(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    } else if (difficulty === "easy") {
      const options = {
        method: "GET",
        url: "https://type.fit/api/quotes",
      };

      axios
        .request(options)
        .then(function (response) {
          setParagraph(response.data[Math.floor(Math.random() * 100)].text);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }

  // 4. Make a word cloud which is a paragraph of words seperated by spaces, then split it into an array
  // const cloud =
  //   "apple banana carrot dog elephant fudge ghana hello iguana jacket king llama monkey nose oval potato queen rat steam tomato umbrella very well xylophone young zoom".split(
  //     " "
  //   );

  const cloud = paragraph.split(" ");

  // 9. A handler function for the onChange
  // If the keystroke was a space then assume the user has attempted the active word, so increment the activeWordIndex and reset the userInput
  // Log in the correctWordArray a true if the attempt matches the paragraph array item at activeWordIndex, a false otherwise.
  // If the keystroke wasn't a space then they're still typing the active word, so just setUserInput(value).
  function processInput(value) {
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
      return;
    } else {
      setUserInput(value);
    }
  }

  return (
    <div className="home">
      <section>
        {user ? <SignOut auth={auth} /> : <SignIn auth={auth} />}
      </section>

      <Timer
        startCounting={startCounting}
        correctWords={correctWordArray.filter(Boolean).length}
      />

      <select name="difficulty" id="difficulty" onChange={buttonHandler}>
        <option>choose difficulty level</option>
        <option value="easy">easy</option>
        <option value="medium">medium</option>
        <option value="hard">hard</option>
      </select>
      {/* 5. The box for the sample paragraph the user must type, populated by Word components. */}
      <Fragment>
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
      </Fragment>

      <Face />

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
    </div>
  );
}
