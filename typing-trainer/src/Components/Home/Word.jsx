import React from "react";

// 7. Define the Word component, picking up the 3 props it's passed and destructure them, change className based on props
export default function Word(props) {
  const { text, active, correct } = props;
  if (correct === true) {
    return (
      <span>
        <span className="correct">{text}</span>{" "}
      </span>
    );
  }
  if (correct === false) {
    return (
      <span>
        <span className="incorrect">{text}</span>{" "}
      </span>
    );
  }
  if (active === true) {
    return (
      <span>
        <span className="active">{text}</span>{" "}
      </span>
    );
  }
  return <span>{text} </span>;
}

// 8. This is to stop each Word component from rerendering on every onChange rerender
// I guess it's like saying please remember this component and don't rerender it with everything else, only when it's specifically rerendered
Word = React.memo(Word);
