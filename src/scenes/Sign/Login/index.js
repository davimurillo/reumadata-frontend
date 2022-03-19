import React, {Component, useState} from 'react';
//import "../styles.scss";
import {
  useNavigate,

} from 'react-router-dom';
import {style} from "typestyle";
import {Nombre} from "../../../components/Core/titles";
import * as session from '../../../services/session';
import {useDispatch} from "react-redux";
import {setAuth} from "../../../services/session/slice";

const cuerpo = style({
  opacity: 100,
  position: "fixed",
  zIndex: 10,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "#0288D1",
})
const formLogin = style({
  backgroundColor: "#11819E",
})

const doctors= require("../../../assets/img/back_doctors.png")
const enfermera= require("../../../assets/img/enfermera.png")
const login= require("../../../assets/img/back_login.jpg")

export default function Login(){
  const navigate = useNavigate();
  const dispatch = useDispatch()

  function _login(event){
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    const username = formData.get('username');
    const password = formData.get('password');
    session.authenticate(username,password).then(response => {
        navigate('/')
    })
  }
  return (
      <div className={"w-full bg-cover bg-center "+cuerpo} >
         <div className="flex flex-col h-full w-full items-center">
           <Nombre size={96}/>
           <div className={"flex flex-row w-full"}>
             <div className={"basis-1/2 m-20"}>
               <img className={"ml-auto"} src={doctors.default}/>
             </div>
             <div className={formLogin + " rounded-lg basis-1/2 m-20"}>
               <form onSubmit={_login} className={"flex-col m-10 space-y-8 px-20 appearance-non"}>
                   <img className={"max-h-36 m-auto"} src={enfermera.default}/>
                   <input
                     className={"w-full h-20 px-5 py-2 text-xl " +
                       "text-gray-700 rounded bg-input-green" }
                     id="email"
                     name="username"
                     placeholder="Correo electrónico"
                     aria-label="email"
                     required/>
                   <input
                     className="w-full h-20 px-5 py-2 text-xl text-gray-700 bg-input-green rounded "
                     type="password"
                     id="password"
                     name="password"
                     placeholder="Contraseña"
                     arial-label="password"
                     required
                   />
                 <button
                     type={"submit"}
                     value={"INGRESAR"}
                     className={"w-full h-20 px-5 py-2 text-4xl text-white bg-[#03045E] " +
                       "hover:bg-[#023e8a] font-dark font-['Mogra']" } >ENTRAR</button>
                 </form>
             </div>
           </div>
         </div>

      </div>
  )
}