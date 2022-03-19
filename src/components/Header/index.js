import React from 'react';
import {Nombre} from "../Core/titles";
const enfermera = require("../../assets/img/enfermera.png");
import {style} from "typestyle";

const styleHeader = style({
  height: "10%"
})

export function Header() {
  return (
    <nav className={"flex items-center justify-between flex-wrap bg-[#065A82] p-2 " + styleHeader}>
      <div className={"hidden lg:block 2xl:block "}>
        <div className="flex items-center flex-no-shrink text-white mr-6">
          <Nombre size={48}/>
        </div>
      </div>
      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white">
          <svg className="h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <div className={""}>
            <input
              className="focus:outline-none focus:bg-green-200 w-1/2 bg-white h-12 px-5 pr-10 rounded-full text-lg focus:outline-none"
              placeholder={"Busqueda paciente"}
            />
          </div>


        </div>
        <div>
          <img className={"max-h-12 m-auto"} src={enfermera.default}/>
        </div>
        <div>
          <a href="#"
             className="inline-block text-lg px-4 py-2 leading-none
             text-white hover:border-transparent
             hover:text-teal mt-4 lg:mt-0">Dr. Nombre Apellido</a>
        </div>
      </div>
    </nav>
  )
}