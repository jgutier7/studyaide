import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from "./App.js";

const rootElement = document.getElementById("app");
ReactDOM.render(
  <GoogleOAuthProvider clientId="695583425567-mk5of6rtvo7vk8f6lpcecaj3is19p3m4.apps.googleusercontent.com">
    <StrictMode>
      <App />
    </StrictMode>,
  </GoogleOAuthProvider>,
  rootElement
);
