import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Whiteboard from './Components/Whiteboard/Whiteboard';
import Login from './Components/Login/Login';
import './styles/App.css';

function App() {
  const modules = [
    { title: 'AP Biology', daysUntilExam: 42, studyStreak: 21 },
    { title: 'AP US History', daysUntilExam: 46, studyStreak: 15 },
  ];

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home modules={modules} />} />
          <Route path="/whiteboard/:moduleClass" element={<Whiteboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
