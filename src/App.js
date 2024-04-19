import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Whiteboard from './Components/Whiteboard/Whiteboard';
import Login from './Components/Login/Login';
<<<<<<< Updated upstream
import './styles/App.css';
import { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
=======
import { googleLogout } from '@react-oauth/google';
>>>>>>> Stashed changes
import axios from 'axios';
import './styles/Login.css';





function App() {
  const modules = [
    { title: 'AP Biology', daysUntilExam: 42, studyStreak: 21 },
    { title: 'AP US History', daysUntilExam: 46, studyStreak: 15 },
  ];

  const [ user, setUser ] = useState([]);
  const [ profile, setProfile ] = useState([]);

<<<<<<< Updated upstream
  const login = useGoogleLogin({
      onSuccess: (codeResponse) => setUser(codeResponse),
      onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(
      () => {
          if (user) {
              axios
                  .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                      headers: {
                          Authorization: `Bearer ${user.access_token}`,
                          Accept: 'application/json'
                      }
                  })
                  .then((res) => {
                      setProfile(res.data);
                  })
                  .catch((err) => console.log(err));
          }
      },
      [ user ]
  );
=======
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
>>>>>>> Stashed changes

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
<<<<<<< Updated upstream
      googleLogout();
      setProfile(null);
=======
    googleLogout();
    setUser(null);
    setProfile(null);
    setRedirectToLogin(true);  // Set flag to true to trigger redirection
>>>>>>> Stashed changes
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
<<<<<<< Updated upstream
          <Route path="/" element={<Home modules={modules} />} />
          <Route path="/whiteboard/:moduleClass" element={<Whiteboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        {profile ? (
                <div>
                    <img src={profile.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
              <button class="google-signin-button" onClick={login}>
                  <img src={require('./images/google-icon.png')} alt="Google sign-in" class="google-icon"/>
                  Sign in with Google 
              </button>
            )}
=======
          <Route path="/" element={
            profile ? (
              <Navigate replace to="/home" />
            ) : (
              <Login onSuccess={onSuccess} onError={onError} />
            )
          } />
          <Route path="/home" element={<Home modules={modules} profile={profile} logOut={logOut} />} />
          <Route path="/whiteboard/:moduleClass" element={<Whiteboard />} />
          {/*<Route path="/login" element={<Login login={onSuccess} />} />*/}
        </Routes>
>>>>>>> Stashed changes
      </div>
    </BrowserRouter>
  );
}

export default App;