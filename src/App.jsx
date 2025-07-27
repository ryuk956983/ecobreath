import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Loader from "./Components/Loader";
import AQI from "./Components/AQI";
import { Routes,Route } from "react-router";
import Search from "./Components/Search";

const App = () => {
  const [loader, setloader] = useState(true);

  return (
    <>
      <main className="w-screen relative overflow-hidden flex flex-col  h-screen text-white bg-black">
        {loader && (
          <div className="absolute w-screen   h-screen z-99">
            <Loader />
          </div>
        )}
        <Navbar setloader={setloader}/>
        <Routes>
          <Route path="/" element={<Home setloader={setloader}/>}/>
          <Route path="/aqi" element={<AQI setloader={setloader}/>}/>
          <Route path="/search" element={<Search/>}/>
        </Routes>
        
      </main>
    </>
  );
};

export default App;
