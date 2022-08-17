import React from "react";
import "./Errors.scss";
import { Link } from "react-router-dom";
import SideNav from "../SideNav/SideNav";

const Errors = ({ errorMessage }) => {
  return !errorMessage ? (
    <>
      <SideNav />
      <div className="error">
        <div className="error-container">
          <h2 className="error-code">404</h2>
          <p className="error-message">Sorry this page could not be found</p>
          <Link to={"/"} className="error-link">
            Home
          </Link>
        </div>
      </div>
    </>
  ) : (
    <>
      <SideNav />
      <div className="error">
        <div className="error-container">
          <h2 className="error-code">{errorMessage.response.status}</h2>
          <p className="error-message">{errorMessage.response.data.msg}</p>
          <Link to={"/"} class="error-link">
            Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default Errors;
