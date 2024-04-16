import React from 'react';
import StudyModules from '../StudyModules/StudyModules';

const Home = ({ modules }) => {
  return (
    <div className="home">
      <div className="navigation">
        <button className="overview">Overview</button>
        <button className="calendar">Calendar</button>
      </div>
      <StudyModules modules={modules} />
      <button className="add-module">+ Add Module</button>
    </div>
  );
};

export default Home;
