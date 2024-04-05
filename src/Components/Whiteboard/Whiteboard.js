// src/Components/Whiteboard/Whiteboard.js
import React from 'react';
import { Tldraw } from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css'

function Whiteboard() {
  return (
    <div className="whiteboard" style={{ position: 'fixed', inset: 0 }}>
      <Tldraw isDarkMode="true" />
    </div>
  );
}

export default Whiteboard;
