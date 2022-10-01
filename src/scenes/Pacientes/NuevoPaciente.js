import React, {useEffect, useState} from "react";
import RequireAuth from "../Auth";
import {Titulo} from "../../components/Core/titles";
import {BoolText, CustomDatePicker, Input, ItemModel, Select, SelectPlace} from "../../components/Forms";
import {CustomItem} from "../../components/Forms/custom";
import "react-datepicker/dist/react-datepicker.css";
import {Link} from "react-router-dom";
import * as core from "../../services/core";
import {useSelector} from "react-redux";
import {COMORBILIDADES, COMPLICACIONES_GESTACION, } from "./constants";
import {INMUNIZACIONES, COMPLICACIONES_PARTO, HABITOS_TOXICOS} from "./constants";
import {GINECO_OBSTETRICOS} from "./constants";
import {ETNIAS, GRADOS, ESTADOS} from "./constants";

export function NuevoPaciente(){

  const [activeTab, setActiveTab] = useState('Filiación');
  const [alergias, setAlergias] = useState([{nombre:"", custom:true}])
  const [familiares, setFamiliares] = useState([{nombre:"", custom:true}])
  const [inmunizaciones, setInmunizaciones] = useState(INMUNIZACIONES)
  const [ginecoObstetricos, setGinecoObstetricos] = useState([{nombre:""}])
  const [metodosAnticonceptivos, setMetodosAnticonceptivos] = useState([])
  const [complicacionesGestacion, setComplicacionesGestacion] = useState(COMPLICACIONES_GESTACION)
  const [complicacionesParto, setComplicacionesParto] = useState(COMPLICACIONES_PARTO)
  const [habitos, setHabitos] = useState(HABITOS_TOXICOS)
  const [comorbilidades, setComorbilidad] = useState(COMORBILIDADES)
  const state = useSelector(state => state.core);


  useEffect( () => {
    console.log('TRATA')
    core.getUbigeos();
  }, [])


  const tabs = ['Filiación','Comorbilidad', 'Antecedentes',
    'Antecedentes gineco-obstetricos',
  ]
  return (
    <RequireAuth>
      <div className={"bg-white m-8 p-8 "}>
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
                <Input placeholder={"XXXXXXXX"}
                       label={"Número de historia clínica"}/>
                <Input placeholder={"XXXXXXXX"}
                       label={"DNI"}
                       validations={{type:"number"}}/>
                <CustomDatePicker label={"Fecha de Nacimiento"}/>
                <SelectPlace label={"Lugar de Nacimiento"} values={state.ubigeos}/>
                <SelectPlace label={"Lugar de Procedencia"} values={state.ubigeos}/>
                <Select label={"Etnia "} values={ETNIAS}/>
                <Select label={"Grado de Instrucción "} values={GRADOS}/>
                <Select label={"Estado Civil "} values={ESTADOS}/>
                <Input label={"Ocupación"} placeholder={"Ocupación"}/>
                <Input label={"Religión"} placeholder={"Religión"}/>
                <Input placeholder={"Celular o fijo "} label={"Número de telefono"}/>
              </div>
            </form>
          }
          {
            activeTab === "Antecedentes" &&
            <form>
              <div className={"grid grid-cols-2 space-x-2"}>
                <CustomItem
                  id={"alergias"}
                  label={"Reacciones Alérgicas"}
                  entradas={alergias}
                  agregar={setAlergias}
                  className={"ml-2"}
                  fields={[{name:"Input", className:"w-11/12", placeholder:"Agregar Medicamento" }]}/>
                <CustomItem
                  id={"autoinmunes"}
                  label={"Antecedentes de enfermedades autoinmunes en familiares"}
                  entradas={familiares}
                  agregar={setFamiliares}
                  fields={[{name:"Input", className:"w-11/12", placeholder:"Agregar enfermedad"}]}/>
                <CustomItem
                  id={"habitos"}
                  label={"Hábitos tóxicos"}
                  entradas={habitos}
                  agregar={setHabitos}
                  fields={[
                    {name:"Check", className:"w-1/12"},
                    {name:"Input", className:"w-8/12", placeholder:"Agregar hábito"},
                    {name:"Select", className:"w-3/12",
                      values:{AN:"Antes", AC: "Actual"}}]}/>
                <CustomItem
                  id={"inmunizaciones"}
                  label={"Inmunizaciones"}
                  entradas={inmunizaciones}
                  agregar={setInmunizaciones}
                  fields={[{name:"Check", className:"w-1/12"},
                    {name:"Input", className:"w-7/12", placeholder:"Agregar inmunización"},
                    {name:"CustomDatePicker", className:"w-3/12"},
                    {name:"TextArea", multiLinea: true, className: "w-1/12"}
                  ]}/>


              </div>
            </form>
          }
          {
            activeTab === "Antecedentes gineco-obstetricos" &&
            <form>
              <div className={"grid grid-cols-3 space-x-2"}>



                <Input placeholder={"XXXXXXXX"}
                       label={"Número de gestaciones"}
                       className={"ml-2"}
                       validations={{type:"number"}}/>
                <Input placeholder={"XXXXXXXX"}
                       label={"Número de abortos"}
                       validations={{type:"number"}}/>
                <Input placeholder={"XXXXXXXX"}
                       label={"Número de partos pretérmino"}
                       validations={{type:"number"}}/>
                <Input placeholder={"XXXXXXXX"}
                       label={"Número de gestaciones"}
                       validations={{type:"number"}}/>
                <Input placeholder={"XXXXXXXX"}
                       label={"Número de abortos"}
                       validations={{type:"number"}}/>
                <Input placeholder={"XXXXXXXX"}
                       label={"Número de partos pretérmino"}
                       validations={{type:"number"}}/>
                <CustomItem
                  id={"gestacion"}
                  label={"Complicaciones durante la gestación"}
                  entradas={complicacionesGestacion}
                  agregar={setComplicacionesGestacion}
                  fields={[{name:"Check", className:"w-1/12"},
                    {name:"Input", className:"w-11/12", placeholder:"Agregar complicación"},
                  ]}/>
                <CustomItem
                  id={"parto"}
                  label={"Complicaciones durante el parto"}
                  entradas={complicacionesParto}
                  agregar={setComplicacionesParto}
                  fields={[{name:"Check", className:"w-1/12"},
                    {name:"Input", className:"w-11/12", placeholder:"Agregar complicación"},
                  ]}/>
                <CustomItem
                  id={"amenorrea"}
                  label={"Amenorrea"}
                  entradas={ginecoObstetricos}
                  agregar={setGinecoObstetricos}
                  esUnico={true}
                  fields={[
                    {name:"Input", className:"w-8/12", placeholder:"Duración - tiempo"},
                    {name:"Select", className:"w-4/12",
                      values:{DI:"Días", ME: "Meses", AN: "Años"}},
                  ]}/>
                <CustomItem
                  id={"anticonceptivos"}
                  label={"Método anticonceptivo"}
                  entradas={metodosAnticonceptivos}
                  agregar={setMetodosAnticonceptivos}
                  fields={[
                    {name:"Input", className:"w-11/12", placeholder:"Agregar método anticonceptivo"},
                  ]}
                />

              </div>
            </form>
          }
          {
            activeTab === "Comorbilidad" &&
            <form>
              <div className={"grid space-x-2"}>
                <CustomItem
                  id={null}
                  label={"Comorbilidades"}
                  entradas={comorbilidades}
                  agregar={setComorbilidad}
                  fields={[{name:"Check", className:"w-1/12"},
                    {name:"Input", className:"w-4/12", placeholder:""},
                    {name:"Select", className:"w-1/12",
                      values:{AN:"Antes", DU: "Durante", DE: "Después"}},
                    {name:"CustomDatePicker", className:"w-1/12"},
                    {name:"CustomDatePicker", className:"w-1/12"},
                    {name:"TextArea", multiLinea: false, className: "w-4/12", placeholder:"Tratamiento"}
                  ]}/>
              </div>
            </form>
          }
        </div>
      </div>
    </RequireAuth>
  )
}