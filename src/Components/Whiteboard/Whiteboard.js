// src/Components/Whiteboard/Whiteboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tldraw } from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css';

function Whiteboard() {
  const navigate = useNavigate();

  const handleBackToOverview = () => {
    navigate('/'); 
  };

  return (
    <div className="whiteboard" style={{ position: 'fixed', inset: 0 }}>
      <button onClick={handleBackToOverview} style={{ position: 'absolute', top: 10, left: 10, zIndex: 1000 }}>
        Back to Overview
      </button>
      <Tldraw isDarkMode={true} />
    </div>
  );
}

export default Whiteboard;
