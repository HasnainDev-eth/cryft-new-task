import "./css/swap.css";
import { BsFillBellFill } from "react-icons/bs";
import Bell from "./Bell";
import { useState } from "react";
import Logo from "./logo.png";
function Swap(props) {
  let _address = props.address;
  const [_bell, setbell] = useState(false);
  function setterBell() {
    if (_bell === false) {
      setbell(true);
    }
    if (_bell === true) {
      setbell(false);
    }
  }
  return (
    <div className="col-md-9">
      <div className="header">
        {/* <h3>
          Gas Tank <br />
          {props.bal?.slice(0, 7)}
        </h3> */}
        <div className="logo-div">
          <img className="logo-header" src={Logo} alt="" />
          <span style={{ color: "white" }}>Cryft Cards</span>
        </div>
        <div className="bell-div">
          <div className="bg-rounded">
            {/* <img
              className="vector"
              src={require("./images/Vector.png")}
              alt=""
              onClick={setterBell}
            /> */}
            <BsFillBellFill style={{ color: "white" }} onClick={setterBell} />
            {/* <img className="bell" src={bell} alt="" /> */}
            {_bell ? (
              <>
                <Bell />
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="bg-block"></div>
          <div className="name-addr">
            <h6>{_address?.substring(0, 16)}</h6>
          </div>
          <div className="hrz-separator"></div>
        </div>
      </div>
      <div className="hrz-separator"></div>
      <div className="content education-content">
        <div className="main-heading">
          <h1>Education</h1>
          <h6>Coming Soon</h6>
        </div>
      </div>
    </div>
  );
}
export default Swap;
