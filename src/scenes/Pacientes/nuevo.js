import React, {useEffect, useState} from "react";
import RequireAuth from "../Auth";
import {Titulo} from "../../components/Core/titles";
import {Agregar} from "../../components/Core/botones";
import {CustomDatePicker, Input, Select, SelectPlace} from "../../components/Forms";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Link} from "react-router-dom";
import * as core from "../../services/core";
import {useSelector} from "react-redux";

export function NuevoPaciente(){

  const [activeTab, setActiveTab] = useState('Filiación') ;
  const [ubigeos, setUbigeos] = useState([])
  const state = useSelector(state => state.core)

  useEffect( () => {
    console.log('TRATA')
    core.getUbigeos();
  }, [])


  const tabs = ['Filiación', 'Reacciones alergicas', 'Antecedentes gineco-obstetricos',
    'Antecedentes familiares', 'Habitos toxicos'
  ]
  return (
    <RequireAuth>
      <div className={"bg-white max-h-screen m-8 p-8 "}>
        <div className={"flex items-center justify-between flex-wrap"}>
          <Titulo titulo={"NUEVO PACIENTE"}/>
          <Link className={"rounded p-2 text-lg text-white bg-[#52b788]"}
                to='/pacientes/'>
            GUARDAR Y SALIR
          </Link>
        </div>

        <ul className='mt-1 border-b-2 solid flex items-stretch cursor-pointer rounded'>
          {tabs.map((tab, index) => {
            return (
            <li key={index} className={'flex py-2 px-6 rounded-t-lg bg-white items-center ' +
              (activeTab === tab ? 'bg-white border-b-4 border-sky-600 ' : 'text-gray-500')}
                onClick={()=> setActiveTab(tab)}
            >{tab}</li>
            )
          })}
        </ul>
        <div>
          { activeTab === "Filiación" &&
            <form>
              <div className={"grid grid-cols-2 space-x-2"}>
                <Input placeholder={"Juan Augusto"} label={"Nombres"} className={"ml-2"}/>
                <Input placeholder={"Perez Lopez"} label={"Apellidos"}/>
                <Select label={"Género"} values={{M: "Masculino", F: "Femenino"}}/>
                <Input placeholder={"XXXXXXXX"} label={"Número de historia clínica"}/>
                <Input placeholder={"XXXXXXXX"} label={"DNI"}/>
                <CustomDatePicker label={"Fecha de Nacimiento"}/>
                {/*<Select label={"Lugar de Nacimiento"} values={{}}/>*/}
                {/*<Select label={"Departamento "} values={{}}/>*/}
                {/*<Select label={"Provincia "} values={{}}/>*/}
                {/*<Select label={"Distrito "} values={{}}/>*/}
                {/*<Select label={"Lugar de Procedencia"} values={{}}/>*/}
                <SelectPlace label={"Lugar de Nacimiento"} values={state.ubigeos}/>
                <SelectPlace label={"Lugar de Procedencia"} values={state.ubigeos}/>
                {/*<Select label={"Departamento "} values={{}}/>*/}
                {/*<Select label={"Provincia "} values={{}}/>*/}
                {/*<Select label={"Distrito "} values={{}}/>*/}
                <Select label={"Etnia "} values={{}}/>
                <Select label={"Grado de Instrucción "} values={{}}/>
                <Select label={"Estado Civil "} values={{}}/>
                <Select label={"Ocupación "} values={{}}/>
                <Select label={"Religion "} values={{}}/>
                <Input placeholder={"Celular o fijo "} label={"Número de telefono"}/>
              </div>
            </form>
          }
        </div>
      </div>
    </RequireAuth>
  )
}