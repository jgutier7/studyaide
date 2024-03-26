import React from 'react';
import '../../styles/Module.css';

function Module({ module }) {
  const { title, daysUntilExam, studyStreak } = module;
  
  return (
    <div className="module">
      <h2>{title}</h2>
      <div className="info">
        <div className="days-until-exam">DAYS UNTIL EXAM: {daysUntilExam}</div>
        <div className="study-streak">STUDY STREAK: {studyStreak}</div>
      </div>
    </div>
  );
}

export default Module;