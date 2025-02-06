import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

// const username = "Luvuyo";
// export const UserContext = React.createContext();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <UserContext.Provider value={username}>
      <App />
    </UserContext.Provider> */}

    {/* <App username={username} /> */}

    <App />
  </StrictMode>
);
