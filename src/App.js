// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StudyModules from './Components/StudyModules/StudyModules';
import Whiteboard from './Components/Whiteboard/Whiteboard';
import './styles/App.css';

function App() {
  const modules = [
    { title: 'AP Biology', daysUntilExam: 42, studyStreak: 21 },
    { title: 'AP US History', daysUntilExam: 46, studyStreak: 15 },
  ];

  return (
    <BrowserRouter>
      <div className="App">
        <div className="navigation">
          <button className="overview">overview</button>
          <button className="calendar">calendar</button>
        </div>
        <Routes>
          <Route path="/" element={<StudyModules modules={modules} />} />
          <Route path="/whiteboard/:moduleClass" element={<Whiteboard />} />
        </Routes>
        <button className="add-module">+ add module</button>
      </div>
    </BrowserRouter>
  );
}

export default App;
