import React from "react";
import classes from "./style.module.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className={classes.header}>
      <h3>MERN Stack Blog App</h3>
      <ul>
        <Link to={'/'}  >
          <li>Home</li>
        </Link>
        <Link to={'/addblog'}>
          <li>Add Blog</li>
        </Link>
      </ul>
    </div>
  );
}

export default Header;
