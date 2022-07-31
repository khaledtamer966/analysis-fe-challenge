import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Singlepage from "./views/Simplepage";
import Dashboard from "./views/Dashboard";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/school/:id" element={<Singlepage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
