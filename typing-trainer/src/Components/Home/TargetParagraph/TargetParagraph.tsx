import "./TargetParagraph.scss"

import { Fragment } from "react";

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


export default function TargetParagraph() {



    return (
        <Fragment>
      <CssBaseline />
      <Container maxWidth="sm" >
        <Box sx={{ borderLeft: 1, borderRight: 1, borderRadius: '16px', mt: "1.5rem", bgcolor: '#black', height: '20vh', color: 'white',  fontFamily: 'Georgia', }} >     <p>A sample paragraph for users to match by typing</p></Box>
      </Container>
    </Fragment>)
}