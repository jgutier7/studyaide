import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';

const Login = ({ onSuccess, onError }) => {
    const login = useGoogleLogin({
        onSuccess: onSuccess,
        onError: onError
    });

    return (
      <div className="login-page">
        <div className="login-box">
          <img src={require('../../images/full_logo_v2.png')} alt="studyAIde Logo" className="logo"/>
          <p className="description-text">Your personalized study tool</p>
          <button className="google-signin-button" onClick={login}>
            <img src={require('../../images/google-icon.png')} alt="Google sign-in" className="google-icon"/>
            Sign in with Google
          </button>
        </div>
      </div>
    );
};

export default Login;