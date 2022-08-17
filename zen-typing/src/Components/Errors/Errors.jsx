import React from "react";
import "./Errors.scss";
import { Link } from "react-router-dom";
import SideNav from "../SideNav/SideNav";

const Errors = ({ errorMessage }) => {
  return !errorMessage ? (
    <>
      <SideNav />
      <div className="errors">
        <div className="errors-container">
          <h2 className="errors-code">404</h2>
          <p className="errors-message">Sorry this page could not be found</p>
          <Link to={"/"} className="errors-link">
            Home
          </Link>
        </div>
      </div>
    </>
  ) : (
    <>
      <SideNav />
      <div className="errors">
        <div className="errors-container">
          <h2 className="errors-code">{errorMessage.response.status}</h2>
          <p className="errors-message">{errorMessage.response.data.msg}</p>
          <Link to={"/"} class="errors-link">
            Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default Errors;
