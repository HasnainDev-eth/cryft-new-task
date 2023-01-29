import "./css/dashboard.css";
import Redeem from "./Redeem";
import Swap from "./Swap.jsx";
import Nft from "./Nft.jsx";
import Wallet from "./Wallet.jsx";

import Education from "./Education.jsx";
import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import { Web3Auth } from "@web3auth/web3auth";
import Logo from "./logo.png";
import { BsArrowLeftCircleFill, BsFillInfoCircleFill } from "react-icons/bs";
require("dotenv").config();
function Dashboard(props) {
  const [page, setpage] = useState("Redeem");
  const [toggle, setToggle] = useState(false);
  let data = props.address;
  console.log(props.new_swap_contract);
  return (
    <>
      <div className="dashboard">
        <div className="container-fluid">
          <div className="row justify-content-start align-items-center">
            <div
              className={toggle ? "main-open sidebar" : "main-close sidebar"}
            >
              <div
                className={toggle ? "sidebar-open side" : "sidebar-close side"}
              >
                <div
                  className={
                    toggle ? "drawer-open drawer" : "drawer-close drawer"
                  }
                  onClick={() => setToggle(!toggle)}
                >
                  <BsArrowLeftCircleFill
                    className={
                      toggle ? "drawer-open-icon " : "drawer-close-icon"
                    }
                  />
                </div>
                <div className="sidebar-logo" onClick={() => setToggle(false)}>
                  <img src="https://rvlt.cryftcards.com/wp-content/uploads/2023/01/cropped-Revoltence-Recovered-1.png" alt="" />
                </div>

                <ul className="top-header">
                  <li
                    onClick={() => {
                      setToggle(false);
                      setpage("Redeem");
                    }}
                  >
                    <a
                      href="#"
                      style={{
                        color: `${page === "Redeem" ? "#11dcd4" : "#fff"}`,
                      }}
                    >
                      Redeem Code
                    </a>
                  </li>
                  <li
                    onClick={() => {
                      setToggle(false);
                      setpage("Wallet");
                    }}
                  >
                    <a
                      href="#"
                      style={{
                        color: `${page === "Wallet" ? "#11dcd4" : "#fff"}`,
                      }}
                    >
                      Mint a Code
                    </a>
                  </li>
                  <li
                    onClick={() => {
                      setToggle(false);
                      setpage("Nft");
                    }}
                  >
                    <a
                      href="#"
                      style={{
                        color: `${page === "Nft" ? "#11dcd4" : "#fff"}`,
                      }}
                    >
                      NFT Wallet
                    </a>
                  </li>
                </ul>
                <ul className="middle-header">
                  <li>
                    <a href=""></a>
                  </li>
                  <li>
                    <a href=""></a>
                  </li>
                </ul>
                <ul className="exitdash">
                  <li onClick={props._logout}>
                    <a href="#">Exit Dashboard</a>
                  </li>
                  <div className="icon">
                    <a href="https://twitter.com/cryftc" target="_blank">
                      <li className="fab fa-twitter"></li>
                    </a>
                    <a href="https://discord.gg/cryft" target="_blank">
                      <li className="fab fa-discord"></li>
                    </a>
                    <a href="https://cryftcards.com/guide.pdf">
                      <BsFillInfoCircleFill className="info-icon" />
                    </a>
                    <p></p>
                  </div>
                </ul>
                <span style={{ color: "white", fontWeight: "700" }}>
                  Gas Tank <br />
                  {props.bal?.slice(0, 7)}
                </span>
                <div className="version-c">
                  <span>v3.4.2</span>
                  <span>Patent Pending</span>
                </div>
              </div>
            </div>
            {page === "Redeem" && (
              <Redeem
                address={props.address}
                setToggle={setToggle}
                bal_update={props.bal_update}
                bal={props.bal}
                redeems={props.redeems}
                signer={props.signer}
                token_bal={props.token_bal}
                rvlt_bal={props.rvlt_bal}
              />
            )}

            {page === "Swap" && (
              <Swap
                address={data}
                login_method={props.login_method}
                setToggle={setToggle}
                new_address={props.address}
                cost_cryft={props.cost_cryft}
                new_swap_contract={props.new_swap_contract}
                bal={props.bal}
                token_bal={props.token_bal}
                swap_contract={props.swap_contract}
                token_contract={props.token_contract}
              />
            )}
            {page === "Nft" && (
              <Nft
                address={props.address}
                setToggle={setToggle}
                bal={props.bal}
                token_bal={props.token_bal}
                nfts={props.nfts}
              />
            )}
            {page === "Education" && (
              <Education
                address={props.address}
                setToggle={setToggle}
                bal={props.bal}
                token_bal={props.token_bal}
              />
            )}
            {page === "Wallet" && (
              <Wallet
                signer={props.signer}
                address={props.address}
                setToggle={setToggle}
                bal={props.bal}
                token_bal={props.token_bal}
                rvlt_bal={props.rvlt_bal}
                giftcontract={props.giftcontract}
                send_bnb={props.send_bnb}
                send_cryft={props.send_cryft}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
