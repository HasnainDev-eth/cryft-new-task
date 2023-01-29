import "./css/landingpage.css";
import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import Magic_link from "./Magic_link.jsx";
import { useMoralis } from "react-moralis";
import { Web3Auth } from "@web3auth/web3auth";
import Logo from "./logo.png";
import { Magic } from "magic-sdk";
import { ethers } from "ethers";
import { BigNumber } from "ethers";
import "./Home.css";
import axios from "axios";
import swap_abi from "./swap_abi.json";
import _swap_abi from "./_swap.json";
import { MdArrowBack } from "react-icons/md";
import abi from "./abi.json";
import token_abi from "./token_abi.json";


import detectEthereumProvider from '@metamask/detect-provider'


import { providers } from "ethers";

import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Imagee from "./images/smalldiamond.png";
import Egg from "./images/smalldiamond.png";
import { findAllByAltText } from "@testing-library/react";
require("dotenv").config();

const MagicApi = process.env.REACT_APP_MAGIC_KEY;
const New_Moralis = require("moralis/node");

function Home() {
  const { isAuthenticated } = useMoralis();

  const [address, seraddress] = useState(localStorage.getItem("seraddress"));
  const [cost_cryft, setcost_cryft] = useState(
    localStorage.getItem("setcost_cryft")
  );
  const [bal, setbal] = useState(localStorage.getItem("setbal"));
  const [token_bal, settoken_bal] = useState(
    localStorage.getItem("settoken_bal")
  );
  const [balrvlt, setbalrvlt] = useState(localStorage.getItem("setbalrvlt"));
  const [rvlt_bal, setrvlt_bal] = useState(
    localStorage.getItem("setrvlt_bal")
  );
  const [nfts, setnfts] = useState(JSON.parse(localStorage.getItem("setnfts")));
  const [login_, setlogin] = useState(
    localStorage.getItem("setlogin") || false
  );
  const toEther = (wei) => ethers.utils.formatEther(wei).toString();
  const [giftcontract, setgiftcontract] = useState();
  const [swap_contract, setswap_contract] = useState();
  const [new_swap_contract, setnew_swap_contract] = useState();
  const [token_contract, settoken_contract] = useState();
  const [rvlt_contract, setrvlt_contract] = useState();
  const [_email, setemail] = useState();
  const [signer, setsigner] = useState();
  const [display_email_box, setdisplay_email_box] = useState("none");
  const [display_email_logo, setdisplay_email_logo] = useState(
    localStorage.getItem("setdisplay_email_logo") || "none"
  );
  const [login_method, setlogin_method] = useState(
    localStorage.getItem("setlogin_method") || " "
  );

  const [redeems, setRedeems] = useState(
    JSON.parse(localStorage.getItem("setRedeems") || "[]") || []
  );
  const customNodeOptions = {
    rpcUrl: "https://bsc-dataseed1.binance.org/", // Your own node URL
    chainId: 56, // Your own node's chainId
  };
  const magic = new Magic(MagicApi, {
    network: customNodeOptions,
  });

  const login = async () => {
    Magic_link_login();
  };
  const metamask_login = async () => {

  const provider = await detectEthereumProvider()

  if (provider) {

  console.log('Ethereum successfully detected!')

  // From now on, this should always be true:
  // provider === window.ethereum

  // Access the decentralized web!

  // Legacy providers may only have ethereum.sendAsync
  const chainId = await provider.request({
    method: 'eth_chainId'
  })
} else {

  // if the provider is not detected, detectEthereumProvider resolves to null
}

    try {
      if (window.parent.ethereum && window.parent.ethereum.isMetaMask) {
        const _provider = new ethers.providers.Web3Provider(window.parent.ethereum);
        await _provider.send("eth_requestAccounts", []);

        const signer = _provider.getSigner();
        const Gift_contract = new ethers.Contract(
          "0x19d36b0486e332400c0Af87DbA99720f50Be681d",
          abi,
          signer
        );
        const _swap_contract = new ethers.Contract(
          "0x9a101CbfC4d4D78b47FfD409189280ffd61c4F18",
          _swap_abi,
          signer
        );
        console.log(_swap_contract);
        const token_contract = new ethers.Contract(
          "0x750db8B9c66d7fcE0a8a0e859c6D46b28Dc4972C",
          token_abi,
          signer
        );
        const rvlt_contract = new ethers.Contract(
          "0x3E05385F64B8Ff3D47A63e1FaeF0585372717B41",
          token_abi,
          signer
        );
        const new_swap_contract = new ethers.Contract(
          "0x6ac68913d8fccd52d196b09e6bc0205735a4be5f",
          swap_abi,
          signer
        );
        // const signature = await signer.signMessage("Hello");
        //const recoveredAddress = ethers.utils.verifyMessage("Hello", signature);
        //console.log(recoveredAddress)

        settoken_contract(token_contract);

        setrvlt_contract(rvlt_contract);

        setswap_contract(_swap_contract);

        setgiftcontract(Gift_contract);

        setlogin(true);
        localStorage.setItem("setlogin", true);
        setnew_swap_contract(new_swap_contract);

        const address = await signer.getAddress();
        setsigner(signer);
        bal_update(address);
        seraddress(address);
        localStorage.setItem("seraddress", address);
        Nft_web3API(address);
        web3API(address);
        web3APIrvlt(address);
        getcryftcost();
        setlogin_method("MetaMask");
        localStorage.setItem("setlogin_method", "MetaMask");
        console.log(address);
        fetch_old_redeems(address);
      }
    } catch {
      setlogin(false);
    }
  };
  const wallet_connect_login = async () => {
    try {
      // Create a connector
      const provider = new WalletConnectProvider({
        rpc: {
          56: "https://bsc-dataseed1.binance.org/",

          // ...
        },
      });

      //  Enable session (triggers QR Code modal)
      await provider.enable();
      const web3Provider = new providers.Web3Provider(provider);

      const signer = web3Provider.getSigner();
      const address = await signer.getAddress();
      const Gift_contract = new ethers.Contract(
        "0x19d36b0486e332400c0Af87DbA99720f50Be681d",
        abi,
        signer
      );
      const _swap_contract = new ethers.Contract(
        "0x9a101CbfC4d4D78b47FfD409189280ffd61c4F18",
        _swap_abi,
        signer
      );
      const new_swap_contract = new ethers.Contract(
        "0x6ac68913d8fccd52d196b09e6bc0205735a4be5f",
        swap_abi,
        signer
      );
      setnew_swap_contract(new_swap_contract);

      setswap_contract(_swap_contract);

      setgiftcontract(Gift_contract);

      const token_contract = new ethers.Contract(
        "0x750db8B9c66d7fcE0a8a0e859c6D46b28Dc4972C",
        token_abi,
        signer
      );

      const rvlt_contract = new ethers.Contract(
        "0x3E05385F64B8Ff3D47A63e1FaeF0585372717B41",
        token_abi,
        signer
      );

      setrvlt_contract(rvlt_contract);


      settoken_contract(token_contract);

   
      setlogin(true);
      localStorage.setItem("setlogin", true);
      setsigner(signer);
      bal_update(address);
      seraddress(address);
      localStorage.setItem("seraddress", address);
      localStorage.setItem("setlogin_method", "Wallet");
      Nft_web3API(address);
      web3API(address);
      web3APIrvlt(address);
      getcryftcost();
      fetch_old_redeems(address);

      console.log(address);
    } catch {
      setlogin(false);
    }
  };

  const Magic_link_login = async () => {
    try {
      setdisplay_email_logo(" ");
      localStorage.setItem("setdisplay_email_logo", " ");
      setlogin_method("Email");
      localStorage.setItem("setlogin_method", "Email");

      const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
      const signer = provider.getSigner();
      //   const _email = prompt('Please enter your name')
      await magic.auth.loginWithMagicLink({ email: _email.toString() });
      // Get user's Ethereum public address
      const Gift_contract = new ethers.Contract(
        "0x19d36b0486e332400c0Af87DbA99720f50Be681d",
        abi,
        signer
      );
      setgiftcontract(Gift_contract);

      const _swap_contract = new ethers.Contract(
        "0x9a101CbfC4d4D78b47FfD409189280ffd61c4F18",
        _swap_abi,
        signer
      );
      setswap_contract(_swap_contract);
      const token_contract = new ethers.Contract(
        "0x750db8B9c66d7fcE0a8a0e859c6D46b28Dc4972C",
        token_abi,
        signer
      );
      const new_swap_contract = new ethers.Contract(
        "0x6ac68913d8fccd52d196b09e6bc0205735a4be5f",
        swap_abi,
        signer
      );

      const rvlt_contract = new ethers.Contract(
        "0x3E05385F64B8Ff3D47A63e1FaeF0585372717B41",
        token_abi,
        signer
      );

      setrvlt_contract(rvlt_contract);
      settoken_contract(token_contract);
      setnew_swap_contract(new_swap_contract);

      //const tx = await contract.GenGift({
      //value:"1000000000000000",
      //gasPrice :10000000000000,
      // gasLimit :100000000000
      //});
      //const receipt = await tx.wait();

      setlogin(true);
      localStorage.setItem("setlogin", true);
      const address = await signer.getAddress();
      bal_update(address);
      seraddress(address);
      localStorage.setItem("seraddress", address);
      setsigner(signer);
      Nft_web3API(address);
      web3API(address);
      web3APIrvlt(address);
      getcryftcost();
      console.log(address);
      fetch_old_redeems(address);

      setdisplay_email_logo("none");
      localStorage.setItem("setdisplay_email_logo", " ");
    } catch {
      setlogin(false);
      setdisplay_email_logo("none");
      localStorage.setItem("setdisplay_email_logo", " ");
      setlogin_method("");
      localStorage.setItem("setlogin_method", " ");
    }
  };

  //const logOut = async () => {
  //await logout(user);
  //console.log("logged out");
  //};
  const send_bnb = async (amount, __address) => {
    const toWei = (ether) => ethers.utils.parseEther(ether);

    const tx = await signer.sendTransaction({
      to: __address,
      value: toWei(amount),
      gasPrice: 10000000000,
      // gasLimit: "2100000"
    });

    // Wait for transaction to be mined
    await tx.wait();

    const address = await signer.getAddress();
    bal_update(address);
    return true;
  };
  const send_cryft = async (_amount, __address, address) => {
    try {
      if (login_method === "Email") {
        const toWei = (ether) => ethers.utils.parseEther(ether);
        //const _amount_ = BigNumber.from(toWei(_amount).toString()).toHexString()

        const tx = await token_contract.transfer(__address, toWei(_amount), {
          gasPrice: 5000000000,

          gasLimit: 3979692,
        });
      } else {
        const toWei = (ether) => ethers.utils.parseEther(ether);
        //const _amount_ = BigNumber.from(toWei(_amount).toString()).toHexString()

        const tx = await token_contract.transfer(__address, toWei(_amount), {
          // gasPrice: "10000000000",
          //gasLimit: "2100000"
        });
      }
      bal_update(address);
    } catch (err) {
      console.log(err);
    }
  };


  const send_rvlt = async (_amount, __address, address) => {
    try {
      if (login_method === "Email") {
        const toWei = (ether) => ethers.utils.parseEther(ether);
        //const _amount_ = BigNumber.from(toWei(_amount).toString()).toHexString()

        const tx = await rvlt_contract.transfer(__address, toWei(_amount), {
          gasPrice: 5000000000,

          gasLimit: 3979692,
        });
      } else {
        const toWei = (ether) => ethers.utils.parseEther(ether);
        //const _amount_ = BigNumber.from(toWei(_amount).toString()).toHexString()

        const tx = await rvlt_contract.transfer(__address, toWei(_amount), {
          // gasPrice: "10000000000",
          //gasLimit: "2100000"
        });
      }
      bal_update(address);
    } catch (err) {
      console.log(err);
    }
  };


  const Nft_web3API = async (_address) => {
    const serverUrl = process.env.REACT_APP_MORALIS_URL;
    const appId = process.env.REACT_APP_MORALIS_ID;
    //await New_Moralis.start({ serverUrl, appId });
    const url = "https://deep-index.moralis.io/api/v2/" + _address + "/nft";

    const options = {
      method: "GET",
      url: url,
      params: {
        chain: "0x38",
        format: "decimal",
        token_addresses: "0x19d36b0486e332400c0Af87DbA99720f50Be681d",
      },
      headers: {
        accept: "application/json",
        "X-API-Key":
          "pJqedlgbiaCUeMQ44X1GSDXVVM2cFnj9nFp3HcpFytnNdbl7NhR3cxIHX6n3CffD",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setnfts(response.data.result);
        console.log(response.data.result);
        localStorage.setItem(
          "setnfts",
          JSON.stringify(response.data.result || "[]")
        );
        // console.log(response.data.result);
      })
      .catch(function (error) {
        console.error(error);
      });

    // setnfts(price.result)
  };
 
  const bal_update = async (address) => {
    const provider = new ethers.providers.JsonRpcProvider(
      //  "https://rinkeby.infura.io/v3/3be7cd4089a94b29a4756a6e279a0de4"
      //   "https://data-seed-prebsc-1-s1.binance.org:8545/"
      //  "https://rpc.testnet.fantom.network/"
      "https://bsc-dataseed1.binance.org/"
    );
    const balance = await provider.getBalance(address);

    setbal(ethers.utils.formatUnits(balance).toString());
    localStorage.setItem(
      "setbal",
      ethers.utils.formatUnits(balance).toString()
    )

    setbalrvlt(ethers.utils.formatUnits(balance).toString());
    localStorage.setItem(
      "setbalrvlt",
      ethers.utils.formatUnits(balance).toString()
    )
  };

  const fetch_old_redeems = async (address) => {
    fetch("https://sea-turtle-app-zsm8c.ondigitalocean.app/address/" + address)
      .then((response) => response.json())
      .then((response) => {
        setRedeems(response.code);
        localStorage.setItem("setRedeems", JSON.stringify(response.code || []));
      })
      .catch((err) => console.error(err));
  };


  const web3API = async (_address) => {
    try {
      let url = "https://bsc-dataseed1.binance.org/";
      let customHttpProvider = new ethers.providers.JsonRpcProvider(url);
      const Read_token_contract = new ethers.Contract(
        "0x750db8B9c66d7fcE0a8a0e859c6D46b28Dc4972C",
        token_abi,
        customHttpProvider
      );
      const _balanceOf = await Read_token_contract.balanceOf(
        _address.toString()
      );
      settoken_bal(toEther(_balanceOf.toString()));
      localStorage.setItem("settoken_bal", toEther(_balanceOf.toString()));
    } catch {}
  };
  

  const web3APIrvlt = async (_address) => {
    try {
      let url = "https://bsc-dataseed1.binance.org/";
      let customHttpProvider = new ethers.providers.JsonRpcProvider(url);
      const Read_rvlt_contract = new ethers.Contract(
        "0x3E05385F64B8Ff3D47A63e1FaeF0585372717B41",
        token_abi,
        customHttpProvider
      );
      const _balanceOf = await Read_rvlt_contract.balanceOf(
        _address.toString()
      );
      setrvlt_bal(toEther(_balanceOf.toString()));
      localStorage.setItem("setrvlt_bal", toEther(_balanceOf.toString()));
    } catch {}
  };


  async function getcryftcost() {
    const pricefrom = await fetch(
      new Request("https://api.livecoinwatch.com/coins/single"),
      {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
          "x-api-key": "2bf7b0b0-0673-4856-b32e-025661049a20",
        }),
        body: JSON.stringify({
          currency: "BNB",
          code: "CRYFT",
          meta: false,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("setcost_cryft", res.rate);
        setcost_cryft(res.rate);
      });
    //console.log(pricefrom.json())
  }

  async function logout() {
    try {
      await magic.user.logout();
      console.log(await magic.user.isLoggedIn()); // => `false`
      setlogin(false);
      localStorage.removeItem("settoken_contract");
      localStorage.removeItem("rvlt_contract");
      localStorage.removeItem("setswap_contract");
      localStorage.removeItem("setgiftcontract");
      localStorage.removeItem("setnew_swap_contract");
      localStorage.removeItem("setsigner");
      localStorage.removeItem("seraddress");
      localStorage.removeItem("Nft_web3API");
      localStorage.removeItem("web3API");
      localStorage.removeItem("web3rvlt");
      localStorage.removeItem("fetch_old_redeems");
      localStorage.removeItem("setnfts");
      localStorage.removeItem("setbal");
      localStorage.removeItem("setRedeems");
      localStorage.removeItem("settoken_bal");
      localStorage.removeItem("setrvlt_bal");
      localStorage.removeItem("setcost_cryft");
      localStorage.removeItem("setlogin");
      localStorage.removeItem("setlogin_method");
    } catch {
      // Handle errors if required!
      setlogin(false);
    }
  }

  useEffect(() => {
    const getMetaMask = async () => {
      console.log("it is here");
      if (login_ && login_method === "MetaMask") {
        console.log("it passes the metamask");
        if (window.parent.ethereum && window.parent.ethereum.isMetaMask) {
          const _provider = new ethers.providers.Web3Provider(window.parent.ethereum);
          console.log("its working now");
          await _provider.send("eth_requestAccounts", []);

          const signer = _provider.getSigner();
          const Gift_contract = new ethers.Contract(
            "0x19d36b0486e332400c0Af87DbA99720f50Be681d",
            abi,
            signer
          );
          const _swap_contract = new ethers.Contract(
            "0x9a101CbfC4d4D78b47FfD409189280ffd61c4F18",
            _swap_abi,
            signer
          );
          console.log(_swap_contract);
          const token_contract = new ethers.Contract(
            "0x750db8B9c66d7fcE0a8a0e859c6D46b28Dc4972C",
            token_abi,
            signer
          );
          const new_swap_contract = new ethers.Contract(
            "0x6ac68913d8fccd52d196b09e6bc0205735a4be5f",
            swap_abi,
            signer
          );
          // const signature = await signer.signMessage("Hello");
          //const recoveredAddress = ethers.utils.verifyMessage("Hello", signature);
          //console.log(recoveredAddress)

          const rvlt_contract = new ethers.Contract(
            "0x3E05385F64B8Ff3D47A63e1FaeF0585372717B41",
            token_abi,
            signer
          );
    
          setrvlt_contract(rvlt_contract);

          settoken_contract(token_contract);

          setswap_contract(_swap_contract);

          setgiftcontract(Gift_contract);

          setlogin(true);
          localStorage.setItem("setlogin", true);
          setnew_swap_contract(new_swap_contract);

          const address = await signer.getAddress();
          setsigner(signer);
          bal_update(address);
          seraddress(address);
          localStorage.setItem("seraddress", address);
          Nft_web3API(address);
          web3API(address);
          web3APIrvlt(address);
          getcryftcost();
          setlogin_method("MetaMask");
          localStorage.setItem(setlogin_method, "MetaMask");
          console.log(address);
          fetch_old_redeems(address);
        }
      }
      if (login_ && login_method === "Wallet") {
        // Create a connector
        const provider = new WalletConnectProvider({
          rpc: {
            56: "https://bsc-dataseed1.binance.org/",

            // ...
          },
        });

        //  Enable session (triggers QR Code modal)
        await provider.enable();
        const web3Provider = new providers.Web3Provider(provider);

        const signer = web3Provider.getSigner();
        const address = await signer.getAddress();
        const Gift_contract = new ethers.Contract(
          "0x19d36b0486e332400c0Af87DbA99720f50Be681d",
          abi,
          signer
        );
        const _swap_contract = new ethers.Contract(
          "0x9a101CbfC4d4D78b47FfD409189280ffd61c4F18",
          _swap_abi,
          signer
        );
        const new_swap_contract = new ethers.Contract(
          "0x6ac68913d8fccd52d196b09e6bc0205735a4be5f",
          swap_abi,
          signer
        );
        setnew_swap_contract(new_swap_contract);

        setswap_contract(_swap_contract);

        setgiftcontract(Gift_contract);

        const token_contract = new ethers.Contract(
          "0x750db8B9c66d7fcE0a8a0e859c6D46b28Dc4972C",
          token_abi,
          signer
        );
        settoken_contract(token_contract);



        const rvlt_contract = new ethers.Contract(
          "0x3E05385F64B8Ff3D47A63e1FaeF0585372717B41",
          token_abi,
          signer
        );
  
        setrvlt_contract(rvlt_contract);




        setlogin(true);
        localStorage.setItem("setlogin", true);
        setsigner(signer);

        bal_update(address);
        seraddress(address);
        localStorage.setItem("seraddress", address);
        Nft_web3API(address);
        web3API(address);
        web3APIrvlt(address);
        getcryftcost();
        fetch_old_redeems(address);

        console.log(address);
      }
      if (login_ && login_method === "Email") {
        console.log("it is in the email");
        setdisplay_email_logo(" ");
        localStorage.setItem("setdisplay_email_logo", " ");
        setlogin_method("Email");
        localStorage.setItem("setlogin_method", "Email");

        const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
        const signer = provider.getSigner();
        //   const _email = prompt('Please enter your name')
        // await magic.auth.loginWithMagicLink({ email: _email.toString() });
        // Get user's Ethereum public address
        const Gift_contract = new ethers.Contract(
          "0x19d36b0486e332400c0Af87DbA99720f50Be681d",
          abi,
          signer
        );
        setgiftcontract(Gift_contract);

        const _swap_contract = new ethers.Contract(
          "0x9a101CbfC4d4D78b47FfD409189280ffd61c4F18",
          _swap_abi,
          signer
        );
        setswap_contract(_swap_contract);
        const token_contract = new ethers.Contract(
          "0x750db8B9c66d7fcE0a8a0e859c6D46b28Dc4972C",
          token_abi,
          signer
        );
        const new_swap_contract = new ethers.Contract(
          "0x6ac68913d8fccd52d196b09e6bc0205735a4be5f",
          swap_abi,
          signer
        );


        const rvlt_contract = new ethers.Contract(
          "0x3E05385F64B8Ff3D47A63e1FaeF0585372717B41",
          token_abi,
          signer
        );
  
        setrvlt_contract(rvlt_contract);


        settoken_contract(token_contract);
        setnew_swap_contract(new_swap_contract);

        //const tx = await contract.GenGift({
        //value:"1000000000000000",
        //gasPrice :10000000000000,
        // gasLimit :100000000000
        //});
        //const receipt = await tx.wait();

        setlogin(true);
        localStorage.setItem("setlogin", true);
        const address = await signer.getAddress();
        bal_update(address);
        seraddress(address);
        localStorage.setItem("seraddress", address);
        setsigner(signer);
        Nft_web3API(address);
        web3API(address);
        web3APIrvlt(address);
        getcryftcost();
        fetch_old_redeems(address);
        setdisplay_email_logo("none");
        localStorage.setItem("setdisplay_email_logo", " ");
      }
    };
    getMetaMask();
  }, [login_]);
  const [toggle, setToggle] = useState(false);
  return (
    <>
      {login_ ? (
        <>
          <Dashboard
            login_method={login_method}
            signer={signer}
            address={address}
            bal_update={bal_update}
            cost_cryft={cost_cryft}
            bal={bal}
            baltvlt={balrvlt}
            token_bal={token_bal}
            rvlt_bal={rvlt_bal}
            nfts={nfts}
            giftcontract={giftcontract}
            swap_contract={swap_contract}
            send_bnb={send_bnb}
            _logout={logout}
            token_contract={token_contract}
            rvlt_contract={rvlt_contract}
            send_cryft={send_cryft}
            send_rvlt={send_rvlt}
            redeems={redeems}
            new_swap_contract={new_swap_contract}
          />
        </>
      ) : (
        <>
          <div className="landingpage-container ">
            <div className="landingpage-innerContainer">
              <div className="mainpage-div">
                <div className="button-div-landingPage">
                <Popup
                    style={{ width: "300px !important" }}
                    onClose={() => setToggle(false)}
                    trigger={(open) => (
                      <button className="button">Click Here</button>
                    )}
                    position="center"
                    closeOnDocumentClick
                  >
                    {toggle ? (
                      <div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <MdArrowBack
                            onClick={() => setToggle(false)}
                            style={{
                              color: "#fff",
                              fontSize: "24px",
                              cursor: "pointer",
                            }}
                          />
                          <h1 className="email-login">Email Login</h1>
                          <div></div>
                        </div>
                        <div className="email_input">
                          <h1>Email Login:</h1>

                          <input
                            type="text"
                            value={_email}
                            onChange={(e) => setemail(e.target.value)}
                            placeholder="Email"
                          />
                          <br />
                          <button onClick={() => Magic_link_login()}>
                            Login
                            <i
                              style={{
                                display: display_email_logo,
                                background: "none",
                              }}
                              className="fa fa-circle-o-notch fa-spin"
                            ></i>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="login_methods">
                        <div className="logins">
                          <button onClick={() => setToggle(true)}>
                            <img src={Logo} alt="" className="wallet-image" />
                            <h2>Email Login</h2>
                          </button>
                        </div>
                        <br />
                        <div className="logins" style={{ width: "300px" }}>
                          <button onClick={() => metamask_login()}>
                            <img
                              src="https://seeklogo.com/images/M/metamask-logo-09EDE53DBD-seeklogo.com.png"
                              alt=""
                              className="wallet-image"
                            />
                            <h2>MetaMask</h2>
                          </button>
                        </div>
                        <br />
                        <div className="logins" style={{ width: "300px" }}>
                          <button onClick={() => wallet_connect_login()}>
                            <img
                              src="https://seeklogo.com/images/W/walletconnect-logo-EE83B50C97-seeklogo.com.png"
                              alt=""
                              className="wallet-image"
                            />
                            <h2>WalletConnect</h2>
                          </button>
                        </div>
                      </div>
                    )}
                  </Popup>
                </div>
              </div>
            </div>

            {/* <div className="row justify-content-center align-items-center">
              <div className="col-md-4">
                <img src={Imagee} alt="" />
              </div>
            </div> */}
          </div>
          <div className="login_box"></div>
        </>
      )}
    </>
  );
}

export default Home;