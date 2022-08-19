import "./About.scss";

import SideNav from "../SideNav/SideNav";

export default function About() {
  return (
    <div className="about-container">
      <SideNav />
      <div className="about-box">
        <p>
          <strong>Zen Typing</strong> is an interactive typing tool to help you
          enter a focused and productive state whilst using your keyboard.
          <br />
          <br />
          Select an activity by difficulty, and then start typing to begin
          logging your emotional state and words per minute.
        </p>
      </div>
      <div className="about-box">
        <p>
          Zen Typing was made by a group of Northcoders students in August 2022:
        </p>
        <p>
          <a href="https://github.com/Paulos-se">Paulos Ghirmai</a>,
          <a href="https://github.com/AlistairHopson"> Alistair Hopson</a>,
          <a href="https://github.com/scottkelly36"> Scott Kelly</a>,{" "}
          <a href="https://github.com/TomReece1"> Thomas Reece</a>.
        </p>
        <br />
        <p>
          {`See our project on `}
          <a href="https://github.com/Northcoders-PAST-team/zen-typing">
            GitHub.
          </a>
        </p>
      </div>
    </div>
  );
}
