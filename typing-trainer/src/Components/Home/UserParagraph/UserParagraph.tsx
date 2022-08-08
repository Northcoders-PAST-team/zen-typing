import "./UserParagraph.scss"

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FC } from "react";


interface UserParagraphProps {
    userInput: string;
}


const UserParagraph:FC<UserParagraphProps> = (props) => {
console.log("userInput is " + props.userInput);

    return (
<div>
<TextField sx={{ borderTop: 1, borderBottom: 1, borderRadius: '16px', mt: "21rem", mb: "15rem", width: 450, bgcolor: 'white', color: "white", input: { color: 'black' }}} id="filled-basic" label="Type here" variant="filled" InputLabelProps={{
    style: { color: 'black' },
  }}/>
</div>

    )
}

export default UserParagraph;