// StudyPreferencesPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import StudyPreferences from './StudyPreferences'; 
import '../../styles/StudyPreferencesPage.css';

const StudyPreferencesPage = () => {
  return (
    <div className="study-preferences-page">
      <div className="button-container">
        <Link to="/home" className="app-button">Overview</Link>
        <Link to="/calendar" className="app-button">Calendar</Link>
        <Link to="/study-preferences" className="app-button">Preferences</Link> {}
      </div>
      <h1>Study Preferences</h1> 
      <div>
        <h3>Preferred Days:</h3>
        <ul>
          {StudyPreferences.preferredDays.map(day => (
            <li key={day}>{day}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Preferred Times:</h3>
        <ul>
          {StudyPreferences.preferredTimes.map(time => (
            <li key={time}>{time}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Session Length:</h3>
        <ul>
        <li>{StudyPreferences.sessionLength} minutes</li>
        </ul>
      </div>
      <div>
        <h3>Module Preferences:</h3>
        <ul>
          {StudyPreferences.modulePreferences.map(module => (
            <li key={module.title}>
              <strong>{module.title}</strong> - Intensity: {module.intensity}
            </li>
          ))}
        </ul>
      </div>
      <button className="app-button" style={{ marginTop: '20px' }}>Edit Preferences</button> {/* Add this button */}
    </div>
  );
};

export default StudyPreferencesPage;
