import React from "react";

const Nav = props => (
  <nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
      {props.whoSignedIn ? (<div>Welcome back, {props.whoSignedIn}</div>) : (<div></div>)}
      </div>
    </div>
  </nav>
);

export default Nav;
