import React from "react";
import Navbar from "./Components/Shared/Navbar";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import NotFound from "./Components/Common/NotFound";
import Login from "./Pages/Login";
import Hijab from "./Components/Home/Hijab";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* Add your routes here */}
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/hijab" element={<Hijab />} />
      </Routes>
    </div>
  );
}

export default App;
