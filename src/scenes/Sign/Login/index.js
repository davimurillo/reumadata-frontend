import React, {Component, useState} from 'react';
//import "../styles.scss";
import {useNavigate} from 'react-router-dom';
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
  backgroundColor: '#68A4FF',
})

const cuerpoIzquierdo = style({
  opacity: 100,
  position: "fixed",
  zIndex: 10,
  left: 0,
  top: 0,
  width: "50%",
  height: "100%",
  backgroundColor: '#68A4FF',
  borderRadiusBottomRight: 35,
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  borderRadius: '0px 0px 0px 15px',
})

const cuerpoDerecho = style({
  opacity: 100,
  position: "fixed",
  zIndex: 10,
  right: 0,
  top: 0,
  width: "50%",
  height: "100%",
  backgroundColor: '#EBEEF6',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignContent: 'center',
  color: "#CCC",
  borderRadius: '15px 0px 0px 0px',
})

const formLogin = style({
  width: 320,
  backgroundColor: '#e7e5e4',
  margin: 'auto',
  borderRadius: 15,
  paddingTop: 10,
  color: '#888',
  boxShadow: '2px 2px 2px #777'
})

const formLoginContent = style({
  width: 320,
  height: 300,
  backgroundColor: '#FFF',
  margin: 'auto',
  borderRadius: '15px',
  marginTop: 20,
  paddingTop: 10,
})

const img_doctor= require("../../../assets/img/img_login_doctor.png")
const login= require("../../../assets/img/logo_reuma.png")

const year = new Date().getFullYear()

export default function Login(){
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [loginData, setLoginData] = useState({username: "", password: ""})
  const [error, setError] = useState(false)

  const _navigateScreen = (url) => {
      navigate(url);
  }

  function _login(event){
    if (loginData.username.length > 0 && loginData.password.length > 0)
      //navigate('/')
      session.authenticate(loginData.username,loginData.password).then(response => {
        console.log("reponse",response);
          _navigateScreen('/')
      })
    else 
      setError(true)
  }

  return (
      <div className={"w-full bg-cover bg-center "+cuerpo} >
         
         <div className={cuerpoIzquierdo}>
            <img className="max-h-20 m-auto mt-4" src={login.default} alt="login" />
            <img className="max-h-50 m-auto mt-4" src={img_doctor.default} alt="login" />
            <div className="m-auto" style={{textAlign: 'center', color: '#FFF'}}>Derechos Reservados {year}</div>
         </div>
         <div className={cuerpoDerecho}>
            <div className={formLogin}>
                <h3 style={{textAlign: 'center', marginTop:10}}>Acceso de Usuario</h3>
                <div className={formLoginContent}>
                  <form className='p-4'>
                      <div className="relative z-0 mt-6">
                          <input type="text" id="username" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={loginData.username} onChange={(e) => setLoginData({...loginData, "username": e.target.value})} />
                          <label htmlFor="username" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Correo Electrónico</label>
                      </div>
                      <div className="relative z-0 mt-8">
                          <input type="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={loginData.password} onChange={(e) => setLoginData({...loginData, "password": e.target.value})} />
                          <label htmlFor="password" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Contraseña</label>
                      </div>
                      <button
                        id="button"
                        type="button"
                        className="mt-16 w-full px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-blue-500 hover:bg-blue-600 hover:shadow-lg focus:outline-none"
                        onClick={()=>_login()}
                      >
                        Ingresar
                      </button>
                      { error && 
                        <label>Error al tratar de ingresar</label>
                      }
                  </form>
                </div>
            </div>
         </div>
         
      </div>
  )
}