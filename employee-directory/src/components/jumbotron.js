import "./styles.css";
import React from "react";

function JumboTron() {
  return (
    <div className="jumbotron jumbotron-fluid text-center">
      <div className="container">
        <h1 className="display-4">Employee Directory</h1>
        <p className="lead">Click on each heaader to re organize list, or use the search bar to find an employee.</p>
      </div>
    </div>
  );
}
export default JumboTron;
