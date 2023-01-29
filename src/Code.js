import React from "react";
import { useState } from "react";

import "./css/buysend.css";
import eye from "./images/eye-slash-solid.svg";

function Send(props) {
  const [scode, setscode] = useState(false);

  const show_code = () => {
    if (scode === false) {
      setscode(true);
    }
    if (scode === true) {
      setscode(false);
    }
  };

  return (
    <div
      className="Send"
      style={{
        borderRadius: "5px",
        height: "275px",
        backgroundColor: "rgb(0 0 0 / 60%)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="inputs" style={{ textAlign: "center", width: "75%" }}>
        <h3 className="txt">
          Cryft Code
          <br />
          <strong style={{ marginRight: "10px" }}>
            {scode ? (
              <span style={{ fontSize: "24px" }}> {props.code}</span>
            ) : (
              <h6>
                Lost codes are not recoverable. Write down or copy & paste in
                safe place.
              </h6>
            )}
          </strong>
        </h3>
        <h1 className="txt"></h1>
        <div
          className="buy-button"
          style={{
            marginTop: "-50px",
            display: "flex",
            alignItems: "center",
            gap: ".5rem",
            width: "100%",
          }}
        >
          <button onClick={show_code}>
            I Understand
          </button>
          <br />

          <button onClick={props.settercode}>Delete Code</button>
        </div>
      </div>
    </div>
  );
}

export default Send;
