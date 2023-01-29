import "./css/redeem.css";
import "./css/buysend.css";
import Send from "./Send";
import Code from "./Code";


import QRCode from "react-qr-code";

import { ethers } from "ethers";
import abi from "./abi.json";
import RedeemP from "./RedeemP";
import { React, useState, useRef, createRef, useEffect, Fragment } from "react";
import Popup from "reactjs-popup";

import { BsFillBellFill } from "react-icons/bs";
import Logo from "./logo.png";
import Logo1 from "./logo1.png";
import TXS from "./TXS.jpg";

import Bell from "./Bell";
//import HCaptcha from "react-hcaptcha";
import HCaptcha from "@hcaptcha/react-hcaptcha";

require("dotenv").config();

var loadjs = require("loadjs");
function Redeem(props) {
  const captcha = useRef();
  const [_HCaptcha, set_HCaptcha] = useState(null);
  const [Redeems, setRedeems] = useState(false);
  const [disable, setDisable] = useState(true);
  const [im_not_robot, setim_not_robot] = useState(false);
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
  const [Custom_Redeem, setCustom_Redeem] = useState(false);
  const [index0, setindex0] = useState();
  const [index1, setindex1] = useState();

  const [index2, setindex2] = useState();
  const [index3, setindex3] = useState();
  const [index4, setindex4] = useState();

  const [value_err, setvalue_err] = useState(false);

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  const [_send, setsend] = useState(false);
  const [btn, setbtn] = useState("Buy");
  const [input, setInput] = useState("");


  function settercode() {
    if (scode === false) {
      setscode(true);
    }
    if (scode === true) {
      setscode(false);
    }
  }



  const [inputa, setInputa] = useState(props.address);
  const [icon, seticon] = useState("none");
  const [code, setcode] = useState();
  const [scode, setscode] = useState(false);
  const [code_display, setcode_display] = useState("none");
  const [show_code, setshow_code] = useState(false);
  const [redeem_code, setRedeems_Code] = useState();
  const [disabled, setDisabled] = useState(false);
  const [load_icon, setload_icon] = useState("none");
  const [GiftValue, setGiftValue] = useState();


  const hide = async () => {
    setshow_code(false);
    setRedeems_Code("");
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




  useEffect(() => {
    if (input.trim().length > 0) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [input]);
  const searchParams = new URLSearchParams(document.location.search);
  useEffect(() => {
    if (props.address) {
      props.bal_update(props.address);
    }
  });

  useEffect(() => {
    const redeemCode = async () => {
      setim_not_robot(true);
      if (searchParams.get("code") && props.address && props.signer) {
        setInput(searchParams.get("code"));
        setim_not_robot(true);
        load(true, searchParams.get("code"));
        var newURL = document.location.href.split("?")[0];
        window.history.pushState("object", document.title, newURL);
        console.log("ye load ky bad aya hy");
      } else {
        return;
      }
    };
    redeemCode();


    let _address = props.address;


    // setim_not_robot(false);
  }, [props.address, props.signer]);

  // const recaptchaRef = React.createRef();

  function onRobot(value) {
    //console.log("Captcha value:", value);

    setim_not_robot(true);
  }
  function onExpired(value) {
    //console.log("Captcha value:", value);
    setim_not_robot(false);
  }
  function handleError(err) {
    console.log("Error in recaptcha", err);
  }

  const handle = async (token) => {
    if (token === null) {
      set_HCaptcha(token);
      setDisable(true);
    } else {
      set_HCaptcha(token);
      setDisable(false);
    }
  };
  const load = async (passing, pinput, sign) => {
    const _index0 = index0 > 0 ? index0 : 0;
    const _index1 = index1 > 0 ? index1 : 0;

    let token_index = [];
    let token_precent = [];
    if (Custom_Redeem === true) {
      if (_index0 > 0) {
        token_index.push(0);
        token_precent.push(parseInt(_index0));
      }
      if (_index1 > 0) {
        token_index.push(1);
        token_precent.push(parseInt(_index1));
      }
    }

    if (Custom_Redeem === false) {
      token_index.push(0);
      token_precent.push(100);
    }
    alert(token_index);
    alert(token_precent);

    if (_HCaptcha != null) {
      console.log("👀");
      setbtn("Redeeming");
      setDisable(true);
      seticon(" ");

      if (Redeems === false) {
        setRedeems(true);

        const inp = input.trim().length > 1 ? input : pinput;
        const signature = await props?.signer.signMessage("Code:" + " " + inp);
        let url =
          "https://sea-turtle-app-zsm8c.ondigitalocean.app/" +
          "Redeem/" +
          inp +
          "/" +
          signature +
          "/" +
          props.address +
          "/" +
          _HCaptcha +
          "/" +
          token_index +
          "/" +
          token_precent;

        fetch(url)
          .then(async (response) => {
            console.log(response.status);
            setbtn("Redeem");
            if (response.status == 200) {
              setTimeout(function () {
                setcode(<center>Successful!</center>);
                setRedeems(false);
                setbtn("Redeem");
                seticon("none");
              }, 3000);
              setTimeout(function(){
                window.location.reload();
              }, 5000);
            }
            if (response.status == 401) {
              setTimeout(function () {
                setcode(<center>Unsuccessful</center>);
                setRedeems(false);
                setbtn("Redeem");
                seticon("none");
              }, 500);
            }

            settercode();
            props?.bal_update(props.address);
          })
          .catch(() => {
            console.error("We have a problem -_-");
            setRedeems(false);
            setbtn("Redeem");
            seticon("none");
          });
      }

      setTimeout(() => {
        setDisable(false);
      }, Math.floor(Math.random() * 10000));
    }
  };



  function code_hide_show() {
    if (code_display === "none") {
      setcode_display(" ");
    }
    if (code_display === " ") {
      setcode_display("none");
    }
  }
  const [_bell, setbell] = useState(false);
  function setterBell() {
    if (_bell === false) {
      setbell(true);
    }
    if (_bell === true) {
      setbell(false);
    }
  }
  function _Done() {
    try {
      const _index0 = index0 > 0 ? index0 : 0;
      const _index1 = index1 > 0 ? index1 : 0;

      const __value =
        parseInt(_index0) +
        parseInt(_index1);


      if (__value === 100) {
        setvalue_err(false);
        setOpen((o) => !o);
        setCustom_Redeem(true);
      } else {
        setvalue_err(true);
      }
    } catch (err) {
      console.log(err);
    }
  }
  function _Reset() {
    setOpen(false)
    setCustom_Redeem(false)
    setindex0(0)
    setindex1(0)

  }


  return (
    <>
      <div className="col-md-9">

        <div className=" redeem-content content">
          <div className="main-heading">
            {scode ? (
              <>
                <RedeemP settercode={settercode} code={code} />
              </>
            ) : (
              <></>
            )}
            <form action="">


            <span
              style={{
                textAlign: "center",
                display: "block",
                fontWeight: "700",
                marginTop:"25px",
              }}
            >
              Wallet Balance
            </span> 

            <div className="separator"></div>
          <div className="sendcryft">
            <div className="sendbusd">
              <div className="icon-send">
                <img
                  style={{ width: "24px", height: "24px" }}
                  src="https://rvlt.cryftcards.com/wp-content/uploads/2023/01/cropped-Revoltence-Recovered-1.png"
                  alt=""
                />
                <h4>RVLT</h4>
              </div>
              <h3 style={{ color: "#fff" }}>
                {Math.trunc(props.rvlt_bal)}
              </h3>
            </div>
            
            <div className="sendbusd">
              <div className="icon-send">
                <img
                  style={{ width: "30px", height: "24px" }}
                  src={Logo1}
                  alt=""
                />
                <h4>CRYFT</h4>
              </div>
              <h3 style={{ color: "#fff" }}>
                {Math.trunc(props.token_bal)}
              </h3>
              
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
                {props.bal?.slice(0, 7)}
              </h3>

            </div>
          </div>


          <button
                  type="button"
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "10px important",
                  }}
                  onClick={() => setOpen((o) => !o)}
                >
                  {" "}
                  Settings{" "}
                </button>


                <div className="input-text">
                <input
                  type="text"
                  placeholder="Enter Gift Code"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                </div>


                <button
                  type="button"
                  onClick={load}
                  disabled={disable}
                  style={{
                    marginTop: "25px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {btn}
                  <i
                    style={{
                      display: icon,
                      background: "none",
                      marginLeft: "1rem",
                    }}
                    className="fa fa-circle-o-notch fa-spin"
                  ></i>
                </button>




                <div
                  style={{ margin: "" }}
                >
                  <div className="popup">
                    <Popup open={open} onClose={closeModal}>
                      <a className="close" onClick={closeModal}>
                        &times;
                      </a>
                      <br />
                      <br />
                      <div className="tokens">
                        <div className="token">
                          <img src={Logo1} alt="" width="65" />
                          <h1>CRYFT</h1>
                          <input
                            type="number"
                            name=""
                            id=""
                            placeholder="0%"
                            value={index1}
                            onChange={(e) => setindex1(e.target.value)}
                          />
                        </div>
                        <br />
                        <div className="token">
                          <img
                            src="https://rvlt.cryftcards.com/wp-content/uploads/2023/01/cropped-Revoltence-Recovered-1.png"
                            alt=""
                            width="60"
                          />
                          <h1>RVLT</h1>
                          <input
                            type="number"
                            name=""
                            id=""
                            placeholder="0%"
                            value={index0}
                            onChange={(e) => setindex0(e.target.value)}
                          />
                        </div>

                        <button
                          type="button"
                          className="redeem-btn"
                          style={{
                            marginTop: "10px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          onClick={() => _Done()}
                        >
                          Done
                        </button>
                       
                        <button
                          type="button"
                          className="redeem-btn"
                          style={{
                            marginTop: "10px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          onClick={() => _Reset()}
                        >
                          Reset
                        </button>
                        {value_err ? (
                          <>
                            <p>Must total 100%</p>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </Popup>
     
                </div>

                <center><HCaptcha
                    ref={captcha}
                    sitekey="62bf5292-69c5-4029-ace9-a22176f307f2"
                    onVerify={(token) => handle(token)}
                    onExpire={(e) => handle(null)}
                    size="compact"
                    theme="dark"
                  /></center>
              </div>
            </form>
          </div>
        </div>

        <div className="redeem-content2">
          <div className="inner-content">
            <h1>Redeemed Codes</h1>

            {props.redeems?.length > 0 ? (
              <div className="redeem-map">
                {props.redeems.map((arr) => {
                  return (
                    <>
                      <div
                        className="code-redeems"
                        // style={{ display: code_display }}
                      >
                        <h3>{arr}</h3>
                      </div>
                    </>
                  );
                })}
              </div>
            ) : (
              <>
                {" "}
                <h6>No Codes Redeemed</h6>
              </>
            )}
            </div>
            </div>

          <div className=" redeem-content content">
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
      </div>
    </>
  )


          }

export default Redeem;
