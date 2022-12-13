import React from "react";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBriefcase, faHospitalUser, faDisease, faBook, faList, faListCheck, faListAlt } from "@fortawesome/free-solid-svg-icons";
const logo = require("../../assets/img/logo_reuma.png");

const styleMenu = {
  borderRadius: 15,
  padding: 10,
  margin: 10,
  width: 350,
  height: "95vh"
}

const styleItemMenu = {
  borderBottom: "1px solid #FFFFFF",
  fontSize: 18,
  fontFamily: "sans-serif"
}

const styleLogo = {
  with: "80%",
  marginBottom: 40,
  padding: 10,
}

export function Menu(){
  const menuOption = [
    { name: 'Inicio', url:'/', icon:faHouse, styles:'menu-option-top'},
    { name: 'Atenciones', url:'/atenciones', icon:faBriefcase},
    { name: 'Pacientes', url:'/pacientes', icon:faHospitalUser},
    { name: 'Enfermedades', url:'/enfermedades', icon:faListAlt},
    { name: 'Reportes', url:'/reportes', icon: faBook },
  ]
  return(
    <div className={"hidden lg:flex flex-col bg-[#6098FA] pt-3 w-80"} style={styleMenu}>
      <img src={logo.default} alt="logo" style={styleLogo}/>
      { menuOption.map((menuItem, index) =>{
        return (
          <Link className={"text-xl text-white p-5"} key={index} to={menuItem.url} style={styleItemMenu}>
            <FontAwesomeIcon icon={menuItem.icon} inverse className="mr-8 h-6" /> {menuItem.name}
          </Link>
        )
      })}
    </div>
  )
}