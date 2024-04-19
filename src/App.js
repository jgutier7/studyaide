import React, { useState, useEffect } from 'react'; 
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import Home from './Components/Home/Home'; 
import Whiteboard from './Components/Whiteboard/Whiteboard'; 
import Login from './Components/Login/Login'; 
import { googleLogout } from '@react-oauth/google'; 
import axios from 'axios'; 
import './styles/App.css'; 
import './styles/Login.css'; 

function App() {
  const modules = [
    { title: 'AP Biology', daysUntilExam: 42, studyStreak: 21 },
    { title: 'AP US History', daysUntilExam: 46, studyStreak: 15 },
  ];

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const onSuccess = (codeResponse) => {
    setUser(codeResponse);
    setRedirectToLogin(false); // Reset redirect on successful login
  };

  const onError = (error) => {
    console.log('Login Failed:', error);
  };

  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                Accept: 'application/json'
            }
        })
        .then(res => setProfile(res.data))
        .catch(err => console.log(err));
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    setUser(null);
    setProfile(null);
    setRedirectToLogin(true);  // Set flag to true to trigger redirection
  };

  return (
    <BrowserRouter>
      <div className="App">
        {redirectToLogin && <Navigate replace to="/" />}
        <Routes>
          <Route path="/" element={
            profile ? (
              <Navigate replace to="/home" />
            ) : (
              <Login onSuccess={onSuccess} onError={onError} />
            )
          } />
          <Route path="/home" element={<Home modules={modules} profile={profile} logOut={logOut} />} />
          <Route path="/whiteboard/:moduleClass" element={<Whiteboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;