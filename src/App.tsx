import React, { useState } from "react";
import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import SinglePage from "@views/DetailsPage";
import Dashboard from "@views/Dashboard";
import { CountryContext } from "./contexts/CountryContext";
import { CampContext } from "./contexts/CampContext";
import { SchoolContext } from "./contexts/SchoolContext";
function App() {
  const [camp, setCamp] = useState("");
  const [country, setCountry] = useState("");
  const [school, setSchool] = useState("");

  return (
    <>
      <CountryContext.Provider value={{ country, setCountry }}>
        <CampContext.Provider value={{ camp, setCamp }}>
          <SchoolContext.Provider value={{ school, setSchool }}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/school/:id" element={<SinglePage />} />
              </Routes>
            </BrowserRouter>
          </SchoolContext.Provider>
        </CampContext.Provider>
      </CountryContext.Provider>
    </>
  );
}

export default App;
