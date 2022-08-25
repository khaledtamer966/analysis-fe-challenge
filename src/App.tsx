import React from "react";
import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import SinglePage from "./views/SimplePage";
import Dashboard from "./views/Dashboard";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/school/:id" element={<SinglePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
