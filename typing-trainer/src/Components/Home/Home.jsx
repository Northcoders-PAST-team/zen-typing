import { useState } from "react";
import "./Home.scss";
import { FC } from "react";
import "./TargetParagraph/TargetParagraph";

import { Fragment } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import TextField from "@mui/material/TextField";
import React from "react";

let Word = (props) => {
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
};

Word = React.memo(Word);

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [activeWordIndex, setActiveWordIndex] = useState(0);

  const emptyBooleanArray = [];
  const [correctWordArray, setCorrectWordArray] = useState(emptyBooleanArray);

  const cloud =
    "apple banana carrot dog elephant fudge ghana hello iguana jacket king llama monkey nose oval potato queen rat steam tomato umbrella very well xylophone young zoom".split(
      " "
    );

  function processInput(value) {
    if (value.endsWith(" ")) {
      //user has finished a word
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
      {/* <TargetParagraph /> */}
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
      {/* <p>{cloud.join(' ')}</p> */}
      {/* <p>{cloud.map((word: string, index: any) => {

                    return <Word
                    text={word}
                    active={index === activeWordIndex}
                    correct={correctWordArray[index]}
                    />
                
            })}</p> */}
      <p>{userInput}</p>

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

      {/* <UserParagraph
            userInput={userInput} setUserInput={setUserInput}
            activeWordIndex={activeWordIndex} setActiveWordIndex={setActiveWordIndex}
            processInput={processInput}
            /> */}
    </div>
  );
}
