// Home.js
import React from 'react';
import { Link } from 'react-router-dom'; 
import StudyModules from '../StudyModules/StudyModules';
import '../../styles/Home.css';

const Home = ({ modules, profile, logOut }) => {
  return (
    <div className="home">
      <div className="navigation">
        <button className="overview">Overview</button>
        <Link to="/calendar" className="app-button">Calendar</Link> {}
      </div>
      {profile && (
        <div>
          <img src={profile.picture} alt="user" id="profile_pic"/>
          <p id="profile_name">{profile.name}</p>
          <button onClick={logOut} id="logout">Log out</button>
        </div>
      )}
      <StudyModules modules={modules} />
      <button className="add-module">+ Add Module</button>
    </div>
  );
};

export default Home;
