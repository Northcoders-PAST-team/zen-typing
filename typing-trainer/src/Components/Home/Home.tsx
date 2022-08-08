import { useState } from "react"
import "./Home.scss"

import TargetParagraph from "./TargetParagraph/TargetParagraph"
import UserParagraph from "./UserParagraph/UserParagraph"






export default function Home() {

    const [userInput, setUserInput] = useState('');

    return (
        <div className="home">

            <TargetParagraph />
            <UserParagraph userInput={userInput} setUserInput={setUserInput}/>
        </div>
    )
}
