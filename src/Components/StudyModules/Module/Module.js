// src/Components/Module/Module.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/Module.css';

function Module({ module }) {
  const { title, daysUntilExam, studyStreak } = module;
  const navigate = useNavigate();
  const moduleClass = title.trim().replace(/\s+/g, '-').toLowerCase();
  console.log(moduleClass)
  const goToWhiteboard = () => {
    navigate(`/whiteboard/${moduleClass}`);
  };

  return (
    <div className={`module module-${moduleClass}`}>
      <h2>{title}</h2>
      <div className="info">
        <div className="days-until-exam">DAYS UNTIL EXAM: {daysUntilExam}</div>
        <div className="study-streak">STUDY STREAK: {studyStreak}</div>
      </div>
      <button className="small-button" onClick={goToWhiteboard}>Whiteboard</button>
    </div>
  );
}

export default Module;
