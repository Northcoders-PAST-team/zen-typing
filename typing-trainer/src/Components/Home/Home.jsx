import { useState, Fragment } from "react";

import "./Home.scss";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import React from "react";

import Face from "../Face/Face";

// 7. Define the Word component, picking up the 3 props it's passed and destructure them, change className based on props
function Word(props) {
  const { text, active, correct } = props;
  if (correct === true) {
    return <span className="correct">{text} </span>;
  }
  if (correct === false) {
    return <span className="incorrect">{text} </span>;
  }
  if (active === true) {
    return <span className="active">{text} </span>;
  }
  return <span>{text} </span>;
}

// 8. This is to stop each Word component from rerendering on every onChange rerender
// I guess it's like saying please remember this component and don't rerender it with everything else, only when it's specifically rerendered
Word = React.memo(Word);

export default function Home() {
  // 1. Use state to hold the userInput, linked to the text input box
  // 2. Use state to track what number in the word array the user is on, start at 0 and increment everytime they type a space
  // 3. Use state to track wether each word was spelled correctly or incorrectly e. [true, true, false, true]
  const [userInput, setUserInput] = useState("");
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [correctWordArray, setCorrectWordArray] = useState([]);

  // 4. Make a word cloud which is a paragraph of words seperated by spaces, then split it into an array
  const cloud =
    "apple banana carrot dog elephant fudge ghana hello iguana jacket king llama monkey nose oval potato queen rat steam tomato umbrella very well xylophone young zoom".split(
      " "
    );

  // 9. A handler function for the onChange
  // If the keystroke was a space then assume the user has attempted the active word, so increment the activeWordIndex and reset the userInput
  // Log in the correctWordArray a true if the attempt matches the paragraph array item at activeWordIndex, a false otherwise.
  // If the keystroke wasn't a space then they're still typing the active word, so just setUserInput(value).
  function processInput(value) {
    if (value.endsWith(" ")) {
      setActiveWordIndex((index) => index + 1);
      setUserInput("");

      setCorrectWordArray((data) => {
        const word = value.trim();
        const newResult = [...data];
        newResult[activeWordIndex] = word === cloud[activeWordIndex];

        return newResult;
      });
    } else {
      setUserInput(value);
    }
  }

  return (
    <div className="home">
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
