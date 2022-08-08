import "./TargetParagraph.scss";

import { Fragment } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { db } from "../../../firebaseConfig";

import {
  collection,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { useState } from "react";

export default function TargetParagraph() {
  const choices = ["HTML", "CSS", "javascript", "python"];
  const [paragraph, setParagraph] = useState("");
  const colRef = collection(db, "paragraphs");
  function buttonHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    const docRef = doc(
      db,
      "paragraphs",
      choices[Math.floor(Math.random() * 4)]
    );
    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        setParagraph(docSnap.data().paragraph);
        console.log(paragraph);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    });
  }

  return (
    <div>
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
            {paragraph}
            <p>A sample paragraph for users to match by typing</p>
          </Box>
        </Container>
      </Fragment>
      <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={buttonHandler} className="button" name="switch">
        switch paragraph
      </button>
    </div>
  );
}
