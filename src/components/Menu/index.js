import React from "react";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBriefcase, faHospitalUser, faDisease, faBook } from "@fortawesome/free-solid-svg-icons";
export function Menu(){
  const menuOption = [
    { name: 'Inicio', url:'/', icon:faHouse, styles:'menu-option-top'},
    { name: 'Atenciones', url:'/atenciones', icon:faBriefcase},
    { name: 'Pacientes', url:'/pacientes', icon:faHospitalUser},
    { name: 'Enfermedades', url:'/enfermedades', icon:faDisease},
    { name: 'Reportes', url:'/reportes', icon: faBook },
  ]
  return(
    <div className={"hidden lg:flex flex-col bg-[#11819E] pt-3 w-80"}>
      { menuOption.map((menuItem, index) =>{
        return (
          <Link className={"text-xl text-white p-5"} key={index} to={menuItem.url}>
            <FontAwesomeIcon icon={menuItem.icon} inverse /> {menuItem.name}
          </Link>
        )
      })}
    </div>
  )
}