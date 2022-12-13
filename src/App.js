import React from "react";
import {Route, Routes, } from "react-router-dom";
import Login from "./scenes/Sign/Login";
import Home from "./scenes/Home";
import {Pacientes} from "./scenes/Pacientes";
import {NuevoPaciente} from "./scenes/Pacientes/NuevoPaciente";
import {Atenciones} from "./scenes/Atenciones";
import {MenuAtenciones} from "./scenes/Atenciones/MenuAtenciones";
import {NuevoLupus} from "./scenes/Lupus/NuevaAtencionLupus";
import {Enfermadades} from "./scenes/Enfermedades";
import {Reportes} from "./scenes/Reportes";

function App() {
  return (
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/pacientes/" element={<Pacientes/>}/>
        <Route path="/pacientes/nuevo/" element={<NuevoPaciente/>}/>
        <Route path="/atenciones/" element={<Atenciones/>}/>
        <Route path="/atenciones/nuevo/" element={<MenuAtenciones/>}/>
        <Route path="/atenciones/nuevo/lupus" element={<NuevoLupus/>}/>
        <Route path="/enfermedades/" element={<Enfermadades/>}/>
        <Route path="/reportes/" element={<Reportes/>}/>
      </Routes>
  );
}

export default App;
