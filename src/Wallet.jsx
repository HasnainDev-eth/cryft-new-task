import "./css/buysend.css";
import "./css/redeem.css";
import Faq from "./Faq";
import QRCode from "react-qr-code";
import bell from "./images/bell.png";
import Send from "./Send";

import abi from "./abi.json";
import Code from "./Code";
import { useState } from "react";
import { ethers } from "ethers";
import Moralis from "moralis";
import "reactjs-popup/dist/index.css";
import Logo from "./logo.png";
import Logo1 from "./logo1.png";
import Popup from "reactjs-popup";
import { useMoralis } from "react-moralis";
import { BsFillBellFill } from "react-icons/bs";
import Bell from "./Bell";
require("dotenv").config();
function Wallet(props) {
  const [_send, setsend] = useState(false);
  const [btn, setbtn] = useState("Buy");
  function setterBell() {
    if (_send === false) {
      setsend(true);
    }
    if (_send === true) {
      setsend(false);
    }
  }
  function settercode() {
    if (scode === false) {
      setscode(true);
    }
    if (scode === true) {
      setscode(false);
    }
  }
  const [icon, seticon] = useState("none");
  const [code, setcode] = useState();
  const [scode, setscode] = useState(false);
  const [bnb_send_address, setbnb_send_address] = useState();
  const [bnb_send_amount, setbnb_send_amount] = useState();
  const [cryft_send_address, setcryft_send_address] = useState();
  const [cryft_send_amount, setcryft_send_amount] = useState();
  const [bnb_send_loading, setbnb_send_loading] = useState("none");
  const [show_code, setshow_code] = useState(false);
  const [redeem_code, setRedeems_Code] = useState();
  const [disabled, setDisabled] = useState(false);
  const [load_icon, setload_icon] = useState("none");
  const [GiftValue, setGiftValue] = useState();
  const show_code_from_api = async () => {
    try {
      setload_icon(" ");
      let _url =
        process.env.REACT_APP_CRYFT_LINK +
        "/generatesignaturerequest/" +
        props.address;
      fetch(_url)
        .then((response) => response.json())
        .then((resData) => {
          const _message = JSON.stringify(resData.message);
          signMessage_and_get_Code(_message);
        });

      const signMessage_and_get_Code = async (_message) => {
        console.log(_message);
        const signature = await props.signer.signMessage(_message);
        let url =
          process.env.REACT_APP_CRYFT_LINK +
          "/getredeemscode/" +
          signature +
          "/" +
          _message;
        fetch(url)
          .then((response) => response.json())
          .then((resData) => {
            console.log(resData.code);
            setRedeems_Code(resData.code);
            setshow_code(true);
            setload_icon("none");
          });
      };
    } catch (err) {
      load_icon("none");
      console.log(err);
      setshow_code(false);
    }
  };

  const hide = async () => {
    setshow_code(false);
    setRedeems_Code("");
  };

  const _bnb_send = async () => {
    try {
      console.log("1");
      setbnb_send_loading("");
      const send_tx = props.send_bnb(
        bnb_send_amount,
        bnb_send_address,
        _address
      );

      setbnb_send_loading("none");
      console.log("2");
    } catch {
      setbnb_send_loading("none");
    }
  };

  const Buy = async () => {
    const newValue = parseFloat(GiftValue) + 0.025;
    const Mini = newValue >= 0.1 ? true : false;
    const Max = newValue <= 1.25 ? true : false;
   
    if ( Mini === true && Max === true) {
      console.log("Buy");
      setbtn("Buying");
      setDisabled(true);

      seticon(" ");
      try {
       

        const toWei = (ether) => ethers.utils.parseEther(ether);

        const tx = await props.giftcontract.BuyGift({
          value: toWei(GiftValue.toString()),
          gasLimit: "370000",
        });

        // Wait for transaction to finish
        const receipt = await tx.wait();

        try {
          let url =
            process.env.REACT_APP_CRYFT_LINK_BUY +
            receipt.transactionHash +
            "/" +
            props.address;
          const response = await fetch(url);
          const json = await response.json();
          setcode(json.Code);
          console.log(json.Code);
        } catch (err) {
          console.log(err);
          settercode();
          setcode("Failed to buy");
        }

        settercode();
        setbtn("Buy");
        seticon("none");
      } catch (err) {
        settercode();
        setcode("Failed to buy");
        console.log(err);
        setbtn("Buy");
        seticon("none");
      }
      setTimeout(() => {
        setDisabled(false);
      }, Math.floor(Math.random() * 10000));
    }
  };
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
            <h6>{_address?.substring(5, 11)}</h6>
          </div>
          <div className="hrz-separator"></div>
        </div>
      </div>
      <div className="hrz-separator"></div>
      <div className="row buy-row">
        <div className="gift-card content">
          <div className="main-heading">
            {scode ? (
              <>
                <Code settercode={settercode} code={code} />
              </>
            ) : (
              <></>
            )}
            <h1>Mint a Gift Code</h1>
            <span
              style={{
                color: "#ffffff",
                textAlign: "center",
                fontWeight: "500",
                display: "block",
                marginTop: "1rem",
              }}
            >
              <b>Min Value</b> 0.075 BNB  <b>Max Value</b> 1.0 BNB
            </span>
            <span
              style={{
                color: "#ffffff",
                textAlign: "center",
                fontWeight: "400",
                display: "block",
                marginTop: ".5rem",
              }}
            >
             Gas Fee: .015BNB*  Platform Fee: .01BNB 
            </span>
            <div className="input-text">
              <input
                type="text"
                placeholder="BNB Value"
                style={{ width: "300px" }}
                onChange={(e) => setGiftValue(e.target.value)}
              />

              <button
                type="button"
                className="wallet-btn"
                onClick={Buy}
                style={{ width: "160px" }}
                disabled={disabled}
              >
                {btn}{" "}
                <i
                  style={{ display: icon, background: "none" }}
                  className="fa fa-circle-o-notch fa-spin"
                ></i>
              </button>
            </div>
            <span
              style={{
                color: "#ffffff",
                textAlign: "center",
                fontWeight: "100",
                display: "block",
                marginTop: ".5rem",
              }}
            >
             *Gas Fees Go To Platform Gas Station
            </span>
            <br></br>
          </div>
        </div>

        <div className="main">
          <div className="qr-code">
            <QRCode value={props.address} size="180" />
          </div>
          <div className="hex">
            <h6
              onClick={() => {
                navigator.clipboard.writeText(props.address);
              }}
            >
              {props.address}
            </h6>
            <span
              style={{
                textAlign: "center",
                display: "block",
                fontWeight: "700",
              }}
            >
              Wallet Address
            </span>
          </div>



          <div className="separator"></div>
          <div className="sendcryft">
            <div className="sendbusd">
              <div className="icon-send">
                <img
                  style={{ width: "24px", height: "24px" }}
                  src="https://avatars.tidiochat.com/1fgggwxxzgfkgix3khgyd2m1fbtbmehm/avatars/e9cce3f7-7986-4f1c-958c-865191a6038c.png"
                  alt=""
                />
                <h4>RVLT</h4>
              </div>
              <h3 style={{ color: "#fff" }}>
                Balance:{Math.trunc(props.rvlt_bal)}
              </h3>
              <Popup
                style={{ width: "300px !important" }}
                trigger={(open) => <button className="button">Send</button>}
                position="center"
                className="wallet-popup"
                closeOnDocumentClick
              >
                <div className="send_box">
                  <h3>Address: </h3>{" "}
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Wallet Address"
                    onChange={(e) => setcryft_send_address(e.target.value)}
                  />
                  <h3>Amount: </h3>{" "}
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="RVLT Amount"
                    onChange={(e) => setcryft_send_amount(e.target.value)}
                  />
                  <br />
                  <h3 style={{ color: "white" }}>
                    Only Click "Confirm Send" once
                    <br />
                  </h3>
                  <button
                    onClick={() =>
                      props.send_rvlt(
                        cryft_send_amount,
                        cryft_send_address,
                        _address
                      )
                    }
                    className="button"
                    style={{
                      marginTop: "10px",
                      width: "150px",
                      height: "40px",
                      borderRadius: "10px",
                    }}
                  >
                    Confirm Send
                  </button>
                </div>
              </Popup>
            </div>
         
            
            <div className="sendbusd">
              <div className="icon-send">
                <img
                  style={{ width: "24px", height: "24px" }}
                  src={Logo1}
                  alt=""
                />
                <h4>CRYFT</h4>
              </div>
              <h3 style={{ color: "#fff" }}>
                Balance:{Math.trunc(props.token_bal)}
              </h3>
              <Popup
                style={{ width: "300px !important" }}
                trigger={(open) => <button className="button">Send</button>}
                position="center"
                className="wallet-popup"
                closeOnDocumentClick
              >
                <div className="send_box">
                  <h3>Address: </h3>{" "}
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Wallet Address"
                    onChange={(e) => setcryft_send_address(e.target.value)}
                  />
                  <h3>Amount: </h3>{" "}
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Cryft Amount"
                    onChange={(e) => setcryft_send_amount(e.target.value)}
                  />
                  <br />
                  <h3 style={{ color: "white" }}>
                    Only Click "Confirm Send" once
                    <br />
                  </h3>
                  <button
                    onClick={() =>
                      props.send_cryft(
                        cryft_send_amount,
                        cryft_send_address,
                        _address
                      )
                    }
                    className="button"
                    style={{
                      marginTop: "10px",
                      width: "150px",
                      height: "40px",
                      borderRadius: "10px",
                    }}
                  >
                    Confirm Send
                  </button>
                </div>
              </Popup>
            </div>
            <div className="sendbusd">
              <div className="icon-send">
                <img
                  style={{ width: "24px", height: "24px" }}
                  src="https://seeklogo.com/images/B/bnb-logo-AC3FE1FF33-seeklogo.com.png"
                  alt=""
                />
                <h4>BNB</h4>
              </div>
              <h3 style={{ color: "#fff" }}>
                Balance:{props.bal?.slice(0, 7)}
              </h3>
              <Popup
                style={{ width: "300px !important" }}
                trigger={(open) => <button className="button">Send</button>}
                position="center"
                className="wallet-popup"
                closeOnDocumentClick
              >
                <div className="send_box">
                  <h3>Address: </h3>{" "}
                  <input
                    type="text"
                    name=""
                    id=""
                    value={bnb_send_address}
                    placeholder="Wallet Address"
                    onChange={(e) => setbnb_send_address(e.target.value)}
                  />
                  <h3>Amount: </h3>{" "}
                  <input
                    type="number"
                    name=""
                    id=""
                    value={bnb_send_amount}
                    placeholder="BNB Amount"
                    onChange={(e) => setbnb_send_amount(e.target.value)}
                  />
                  <br />
                  <h3 style={{ color: "white" }}>
                    Only Click "Confirm Send" once
                    <br />
                  </h3>
                  <button
                    className="button"
                    onClick={() => _bnb_send()}
                    style={{
                      marginTop: "10px",
                      width: "150px",
                      height: "40px",
                      borderRadius: "10px",
                    }}
                  >
                    Confirm Send
                    <i
                      style={{ display: bnb_send_loading, background: "none" }}
                      className="fa fa-circle-o-notch fa-spin"
                    ></i>
                  </button>
                </div>
              </Popup>

              {_send ? (
                <>
                  <Send setterBell={setterBell} />
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div className="old_redeems">
          <h1>My Cryft Codes</h1>
          {show_code ? (
            <>
              {redeem_code?.length > 0 ? (
                <>
                  {redeem_code.map((arr) => {
                  
                    return (
                      <>
                        <div className="code-redeems">
                          <h3>{arr}</h3>
                        </div>
                      </>
                    );
                  })}
                  <button className="show-button" onClick={hide}>
                    Hide
                  </button>
                </>
              ) : (
                <>
                  {" "}
                  <h6 style={{ color: "white" }}>
                    This feature is not to be relied on for storage
                  </h6>
                </>
              )}
            </>
          ) : (
            <>
              {" "}
              <button className="show-button" onClick={show_code_from_api}>
              <i
                  style={{ display: load_icon, background: "none" }}
                  className="fa fa-circle-o-notch fa-spin"
                ></i>
                Show My Cryft Codes{" "}
              </button>{" "}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default Wallet;