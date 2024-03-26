// src/App.js
import React from 'react';
import StudyModules from './Components/StudyModules/StudyModules.js';
import './styles/App.css';
function App() {
  const modules = [
    { title: 'AP Biology', daysUntilExam: 42, studyStreak: 21 },
    { title: 'AP US History', daysUntilExam: 46, studyStreak: 15 }
  ];

  return (
    <div className="App">
      <div className="header">Ending Overview Page</div>
      <div className="navigation">
        <button className="overview">overview</button>
        <button className="calendar">calendar</button>
      </div>
      <StudyModules modules={modules} />
      <button className="add-module">+ add module</button>
    </div>
  );
}

export default App;
