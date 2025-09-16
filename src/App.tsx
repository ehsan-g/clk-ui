import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Global } from '@emotion/react';
import Container from '@mui/material/Container';
import NavBar from './components/NavBar.js';
import SwapPage from './pages/SwapPage.js';
import AddLiquidityPage from './pages/AddLiquidityPage.js';
import { AztecContext } from './aztecEnv.js';
import Admin from './pages/Admin.jsx';

const App: React.FC = () => {

  const [pxe, setPXE] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [showContractInterface, setShowContractInterface] = useState(false);
  const [node, setAztecNode] = useState(null);
  const [isPXEInitialized, setPXEInitialized] = useState(false);
  const [walletAlias, setWalletAlias] = useState('');
  const [walletDB, setWalletDB] = useState(null);
  const [currentContractArtifact, setCurrentContractArtifact] = useState(null);
  const [currentTx, setCurrentTx] = useState(null);
  const [currentContractAddress, setCurrentContractAddress] = useState(null);
  const [logs, setLogs] = useState([]);
  const [logsOpen, setLogsOpen] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [network, setNetwork] = useState(null);
  const [totalLogCount, setTotalLogCount] = useState(0);
  const [defaultContractCreationParams, setDefaultContractCreationParams] = useState({});
  const [pendingTxUpdateCounter, setPendingTxUpdateCounter] = useState(0);
  const [isNetworkCongested, setIsNetworkCongested] = useState(false);

  const AztecContextInitialValue = {
    pxe,
    connecting,
    network,
    wallet,
    isPXEInitialized,
    walletAlias,
    walletDB,
    currentContractArtifact,
    currentTx,
    node,
    currentContractAddress,
    logs,
    logsOpen,
    showContractInterface,
    totalLogCount,
    pendingTxUpdateCounter,
    defaultContractCreationParams,
    isNetworkCongested,
    setTotalLogCount,
    setIsNetworkCongested,
    setNetwork,
    setConnecting,
    setLogsOpen,
    setLogs,
    setAztecNode,
    setCurrentTx,
    setWalletDB,
    setPXEInitialized,
    setWallet,
    setPXE,
    setShowContractInterface,
    setDefaultContractCreationParams,
    setWalletAlias,
    setCurrentContractArtifact,
    setCurrentContractAddress,
    setPendingTxUpdateCounter,
  };

  return (
    <div>
      <AztecContext.Provider value={AztecContextInitialValue}>
        <NavBar />
        <Container maxWidth="md">
          <Routes>
            <Route path="/" element={<SwapPage />} />
            <Route path="/add" element={<AddLiquidityPage />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Container>
      </AztecContext.Provider>
    </div>
  );
};

export default App;
