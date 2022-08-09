import "./Home.scss"

import TargetParagraph from "./TargetParagraph/TargetParagraph"
import UserParagraph from "./UserParagraph/UserParagraph"






export default function Home() {


    return (
        <div className="home">

            <TargetParagraph />
            <UserParagraph />
        </div>
    )
}