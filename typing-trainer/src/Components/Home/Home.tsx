import { SetStateAction, JSXElementConstructor, ReactElement, ReactFragment, useState } from "react"
import "./Home.scss"

import TargetParagraph from "./TargetParagraph/TargetParagraph"
// import UserParagraph from "./UserParagraph/UserParagraph"

import TextField from '@mui/material/TextField';




export default function Home() {



    const [userInput, setUserInput] = useState('');
    const [activeWordIndex, setActiveWordIndex] = useState(0);

    const cloud = 'apple banana carrot'.split(' ');

    function processInput(value: string) {
        if(value.endsWith(' ')) {
            setActiveWordIndex(index => index +1)
            setUserInput('')
        } else {
            setUserInput(value)
        }
        }

    return (
        <div className="home">

            <TargetParagraph />
            <p>{cloud.join(' ')}</p>
            <p>{cloud.map((word: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | null | undefined, index: any) => {
                if (index === activeWordIndex) {
                    return <b>{word} </b>
                }
                return <span>{word} </span>
            })}</p>
            <p>{userInput}</p>

            <TextField type="text" value={userInput} 
    onChange={(e)=>{
        // props.setUserInput(e.target.value)
        processInput(e.target.value);
    }}
sx={{ borderTop: 1, borderBottom: 1, borderRadius: '16px', mt: "21rem", mb: "15rem", width: 450, bgcolor: 'white', color: "white", input: { color: 'black' }}} id="filled-basic" label="Type here" variant="filled" InputLabelProps={{
    style: { color: 'black' },
  }}/>

            {/* <UserParagraph
            userInput={userInput} setUserInput={setUserInput}
            activeWordIndex={activeWordIndex} setActiveWordIndex={setActiveWordIndex}
            processInput={processInput}
            /> */}
        </div>
    )
}
