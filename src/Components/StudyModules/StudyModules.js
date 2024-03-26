import React from 'react';
import Module from '../Module/Module';
import '../../styles/StudyModules.css';

function StudyModules({ modules }) {
  return (
    <div className="module-container">
      {modules.map((module, index) => (
        <Module key={index} module={module} />
      ))}
    </div>
  );
}

export default StudyModules;