import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import NavBar from './components/NavBar';
import SwapPage from './pages/SwapPage';
import AddLiquidityPage from './pages/AddLiquidityPage';

const App: React.FC = () => {
  return (
    <div>
      <NavBar />
      <Container maxWidth="md">
        <Routes>
          <Route path="/" element={<SwapPage />} />
          <Route path="/add" element={<AddLiquidityPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
