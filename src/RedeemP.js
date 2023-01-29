import React from "react";
import "./css/buysend.css";

function Send(props) {
  return (
    <div className="Send">
      <div className="inputs">
        <h3 className="txt">
          Wait for confirmation...
          <br />
          <strong style={{ marginRight: "30px" }}>{props.code}</strong>
        </h3>
        <button onClick={props.settercode}>Close</button>
      </div>
    </div>
  );
}

export default Send;
