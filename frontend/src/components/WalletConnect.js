import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./WalletConnect.css";

function WalletConnect() {
  const [walletAddress, setWalletAddress] = useState(null);

  // Connect wallet
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask not found! Install it from metamask.io");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);

      await provider.send("eth_requestAccounts", []);

      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setWalletAddress(address);
    } catch (err) {
      console.error("Connection failed:", err);
      alert("Wallet connection failed. Please try again.");
    }
  };

  // Disconnect (UI only)
  const disconnect = () => {
    setWalletAddress(null);
  };

  // Short wallet display
  const shortAddress = (addr) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  // Auto-detect account change in MetaMask
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        } else {
          setWalletAddress(null);
        }
      });
    }
  }, []);

  return walletAddress ? (
    <div className="wallet-connected">
      <span className="wallet-address">
        {shortAddress(walletAddress)}
      </span>
      <button className="wallet-disconnect" onClick={disconnect}>
        ✕
      </button>
    </div>
  ) : (
    <button className="wallet-btn" onClick={connectWallet}>
      Connect Wallet
    </button>
  );
}

export default WalletConnect;