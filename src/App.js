import React from "react";
import {Route, Routes, } from "react-router-dom";
import Login from "./scenes/Sign/Login";
import Home from "./scenes/Home";
import {Pacientes} from "./scenes/Pacientes";
import {NuevoPaciente} from "./scenes/Pacientes/nuevo";

function App() {
  return (
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/pacientes" element={<Pacientes/>}/>
        <Route path="/pacientes/nuevo" element={<NuevoPaciente/>}/>
      </Routes>
  );
}

export default App;
