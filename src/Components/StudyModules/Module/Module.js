// src/Components/Module/Module.js
import React from 'react';
import '../../../styles/Module.css';

function Module({ module }) {
  const { title, daysUntilExam, studyStreak } = module;
  
  // Determine the class based on the title
  const moduleClass = title.replace(/\s+/g, '-').toLowerCase();
  
  return (
    <div className={`module module-${moduleClass}`}>
      <h2>{title}</h2>
      <div className="info">
        <div className="days-until-exam">DAYS UNTIL EXAM: {daysUntilExam}</div>
        <div className="study-streak">STUDY STREAK: {studyStreak}</div>
      </div>
    </div>
  );
}

export default Module;