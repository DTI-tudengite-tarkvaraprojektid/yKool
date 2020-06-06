import React, { useState, useContext } from "react";
import "./styles/App.css";
import MainRouter from "./MainRouter";
import UserContextProvider from "./store/UserContextProvider.js";

const App = () => {
  return (
    <UserContextProvider>
      <MainRouter />
    </UserContextProvider>
  );
};

export default App;
