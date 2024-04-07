// src/Components/Whiteboard/Whiteboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tldraw } from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css';
import Timer from './Timer';

function Whiteboard() {
  const navigate = useNavigate();

  const handleBackToOverview = () => {
    navigate('/'); 
  };
  // need to change this to be adjustable //
  const [timerDuration] = useState(60000);

  return (
    <div className="whiteboard" style={{ position: 'fixed', inset: 0 }}>
      <button onClick={handleBackToOverview} style={{ position: 'absolute', top: 10, left: 10, zIndex: 1000 }}>
        Back to Overview
      </button>
      <div style={{position: 'absolute', bottom:10, right:10, zIndex: 1000 }}>
        <Timer duration={timerDuration}/>
      </div>
      <Tldraw isDarkMode={true} />
    </div>
  );
}

export default Whiteboard;
