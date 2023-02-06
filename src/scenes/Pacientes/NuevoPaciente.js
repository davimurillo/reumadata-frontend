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

const filiation = {
  date_birth: "",
  degree: "",
  dni: "",
  ethnicity: "",
  first_name: "",
  gender: "",
  last_name: "",
  marital_status: "",
  medical_history_number: "",
  occupation: "",
  place_birth: {},
  place_origin: {},
  religion: "",
  phone_number: {}
}

export function NuevoPaciente(){

  const [activeTab, setActiveTab] = useState('Filiación');
  const [alergias, setAlergias] = useState([{nombre:"", custom:true}])
  const [familiares, setFamiliares] = useState([{nombre:"", custom:true}])
  const [phoneNumber, setPhoneNumber] = useState([{type: "", number:"", custom:true}])
  const [inmunizaciones, setInmunizaciones] = useState(INMUNIZACIONES)
  const [ginecoObstetricos, setGinecoObstetricos] = useState([{nombre:""}])
  const [metodosAnticonceptivos, setMetodosAnticonceptivos] = useState([{nombre:"", custom:true}])
  const [complicacionesGestacion, setComplicacionesGestacion] = useState(COMPLICACIONES_GESTACION)
  const [complicacionesParto, setComplicacionesParto] = useState(COMPLICACIONES_PARTO)
  const [habitos, setHabitos] = useState(HABITOS_TOXICOS)
  const [comorbilidades, setComorbilidad] = useState(COMORBILIDADES)
  const [pacienteData, setPacienteData] = useState({filiation})
  const [tabs, setTabs] = useState(['Filiación','Comorbilidad','Antecedentes'])
  const state = useSelector(state => state.core);


  useEffect( () => {
    core.getUbigeos();
  }, [])

  const saveData = () => {
    //const form = document.getElementById('formData');
    console.log(pacienteData);
    const validate = Object.keys(pacienteData.filiation).filter(e => {
        if (typeof(pacienteData.filiation[e]) == "object") {
          return  Object.keys(pacienteData.filiation[e]).length == 0
        }else{
          return pacienteData.filiation[e].length == 0
        }
      }
    )
    if (validate.length > 0){
      alert("Revise los datos del paciente, faltan datos por completar")
      return
    }

    core.savePatientData(pacienteData.filiation)

  }

  const onChangeCustomItem = (e) => {
    const id = Object.keys(e)[0];
    const value = e[id];
    console.log({id, value})
    onChange({id, value});
  }

  const onChange = (e) => {
    const data = pacienteData; 

    if (e.id == "place_birth"){
        data.filiation.place_birth["country"] = e.value
        return setPacienteData(data);
    } 
    
    if (e.id == "place_birth_distrito") {
        data.filiation.place_birth["district"] = e.value
        return setPacienteData(data);
    } 

    if (e.id == "place_origin"){
      data.filiation.place_origin["country"] = e.value
      return setPacienteData(data);
    } 
  
    if (e.id == "place_origin_distrito") {
        data.filiation.place_origin["district"] = e.value
        return setPacienteData(data);
    } 
    
    data.filiation[e.id] = e.value;
    console.log('last data', data);
    setPacienteData(data);

    if (e.id == "gender" && e.value == "F"){
      setTabs(['Filiación','Comorbilidad','Antecedentes','Antecedentes gineco-obstetricos'])
    } else {
      setTabs(['Filiación','Comorbilidad','Antecedentes'])
    }

  }

  
 
  return (
    <RequireAuth>
      <div className={"bg-white m-8 p-8 "}>
        <div className={"flex items-center justify-between flex-wrap"}>
          <Titulo titulo={"NUEVO PACIENTE"}/>
          <button type="submit" className={"rounded p-2 text-lg text-white bg-[#52b788]"}
                onClick={saveData}>
            GUARDAR Y SALIR
          </button>
        </div>
        <ul className='mt-1 border-b-2 solid flex items-stretch cursor-pointer rounded'>
          {tabs.map((tab, index) => {
            return (
            <li key={index} className={'mb-4 flex py-2 px-6 rounded-t-lg bg-white items-center ' +
              (activeTab === tab ? 'bg-white border-b-4 border-sky-600 ' : 'text-gray-500')}
                onClick={()=> setActiveTab(tab)}
            >{tab}</li>
            )
          })}
        </ul>
        <div>
          { activeTab === "Filiación" &&
            <form id="formData">
              <div className={"grid grid-cols-2 space-x-2"}>
                <Input id="first_name" placeholder={"Juan Augusto"} label={"Nombres"} className={"ml-2"} onChange={onChange}/>
                <Input id="last_name" placeholder={"Perez Lopez"} label={"Apellidos"} onChange={onChange}/>
                <Select id="gender" value={pacienteData.filiation.gender} label={"Género"} values={{M: "Masculino", F: "Femenino"}} onChange={onChange}/>
                <Input id="medical_history_number" placeholder={"XXXXXXXX"} label={"Número de historia clínica"} onChange={onChange}/>
                <Input id="dni" placeholder={"XXXXXXXX"} label={"DNI"} validations={{type:"number"}} onChange={onChange}/>
                <CustomDatePicker id="date_birth" label={"Fecha de Nacimiento"}  onChange={onChange}/>
                <SelectPlace id="place_birth" label={"Lugar de Nacimiento"} values={state.ubigeos} onChange={onChange}/>
                <SelectPlace id="place_origin" label={"Lugar de Procedencia"} values={state.ubigeos} onChange={onChange}/>
                <Select id="ethnicity" value={pacienteData.filiation.ethnicity} label={"Etnia"} values={ETNIAS} onChange={onChange} />
                <Select id="degree" value={pacienteData.filiation.degree} label={"Grado de Instrucción"} values={GRADOS} onChange={onChange}/>
                <Select id="marital_status" value={pacienteData.filiation.marital_status} label={"Estado Civil"} values={ESTADOS} onChange={onChange}/>
                <Input id="occupation" label={"Ocupación"} placeholder={"Ocupación"} onChange={onChange}/>
                <Input id="religion" label={"Religión"} placeholder={"Religión"} onChange={onChange}/>
                <CustomItem
                  id="phone_number"
                  label={"Numeros de teléfono(s)"}
                  templateData={{"type": "", "number":"", custom:true}}
                  entradas={phoneNumber}
                  agregar={setPhoneNumber}
                  onChange={onChangeCustomItem}
                  fields={[
                    {cantidad:1, campos: [
                      {name:"Select", id:"type", className:"w-3/12", values:{Fijo:"Fijo", Celular: "Celular"}},
                      {name:"Input", id:"number", type:"number", className:"w-9/12", placeholder:"Agregar Telefono"}
                    ]}
                  ]}/>
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
                  fields={[{cantidad:1, campos: [
                      {name:"Input", id: "medicamento",  className:"w-11/12", placeholder:"Agregar Medicamento" }]},
                    {cantidad:10, campos: [
                      {name:"Input", id: "medicamento", className:"w-11/12", placeholder:"Agregar Medicamento" }]},
                  ]}/>
                <CustomItem
                  id={"autoinmunes"}
                  label={"Antecedentes de enfermedades autoinmunes en familiares"}
                  entradas={familiares}
                  agregar={setFamiliares}
                  onChange={onChange}
                  fields={[
                    {cantidad:1, campos: [
                      {name:"Input", className:"w-11/12", placeholder:"Agregar enfermedad"}
                    ]},
                    {cantidad:10, campos: [
                        {name:"Input", className:"w-11/12", placeholder:"Agregar enfermedad"}
                      ]},
                  ]}/>
                <CustomItem
                  id={"habitos"}
                  label={"Hábitos tóxicos"}
                  entradas={habitos}
                  agregar={setHabitos}
                  onChange={onChange}
                  fields={[
                    {cantidad:3, campos: [
                      {name:"Check", className:"w-1/12"},
                      {name:"label", className:"w-5/12", data:"nombre", placeholder:"Agregar hábito"},
                      {name:"Select", className:"w-3/12",
                        values:{AN:"Antes", AC: "Actual"}},
                      {name:"CustomDatePicker", className:"w-4/12"},
                      ]},
                    {cantidad:10, campos: [
                        {name:"Check", className:"w-1/12"},
                        {name:"Input", className:"w-5/12", placeholder:"Agregar hábito"},
                        {name:"Select", className:"w-3/12",
                          values:{AN:"Antes", AC: "Actual"}},
                        {name:"CustomDatePicker", className:"w-4/12"},
                      ]},
                  ]}/>
                <CustomItem
                  id={"inmunizaciones"}
                  label={"Inmunizaciones"}
                  entradas={inmunizaciones}
                  agregar={setInmunizaciones}
                  onChange={onChange}
                  fields={[
                    {cantidad:8, campos: [
                      {name:"Check", className:"w-1/12"},
                      {name:"label", className:"w-4/12", data:"nombre", placeholder:"Agregar hábito"},
                      {name:"CustomDatePicker", className:"w-3/12"},
                      {name:"TextArea", multiLinea: false, className: "w-4/12", placeholder:"descripción inmunización"}
                    ]},
                    {cantidad:5, campos: [
                      {name:"Input", className:"w-4/12", placeholder:"Agregar inmunización"},
                      {name:"CustomDatePicker", className:"w-3/12"},
                      {name:"TextArea", multiLinea: false, className: "w-4/12", placeholder:"descripción inmunización"}
                    ]}
                  ]}/>


              </div>
            </form>
          }
          {
            activeTab === "Antecedentes gineco-obstetricos" && pacienteData?.genero == "F" &&
            <form>
              <div className={"grid grid-cols-2 space-x-2"}>
                 <CustomItem
                  id={"amenorrea"}
                  label={"Amenorrea"}
                  entradas={ginecoObstetricos}
                  agregar={setGinecoObstetricos}
                  onChange={onChange}
                  esUnico={true}
                  fields={[{cantidad:1, campos: [
                    {name:"Check", className:"w-1/12"},
                    {name:"Input", className:"w-7/12", placeholder:"Duración - tiempo"},
                    {name:"Select", className:"w-4/12",
                      values:{DI:"Días", ME: "Meses", AN: "Años"}},
                  ]}
                  ]}/>
                <CustomItem
                  id={"anticonceptivos"}
                  label={"Método anticonceptivo"}
                  entradas={metodosAnticonceptivos}
                  agregar={setMetodosAnticonceptivos}
                  onChange={onChange}
                  fields={[
                    {cantidad:1, campos: [
                      {name:"Input", className:"w-11/12", placeholder:"Agregar método anticonceptivo"}
                    ]},
                    {cantidad:10, campos: [
                        {name:"Input", className:"w-11/12", placeholder:"Agregar método anticonceptivo"}
                      ]},
                  ]}
                />
                <Input 
                      id="numero_gestacion"
                      placeholder={"XXXXXXXX"}
                      label={"Número de gestaciones"}
                      validations={{type:"number"}}
                      onChange={onChange}/> 
                <Input placeholder={"XXXXXXXX"}
                      id="numero_aborto"
                       label={"Número de abortos"}
                       validations={{type:"number"}}
                       onChange={onChange}/> 
                <Input placeholder={"XXXXXXXX"}
                      id="numero_partos_preterminos"
                       label={"Número de partos pretérminos"}
                       validations={{type:"number"}}
                       onChange={onChange}/> 
                <Input placeholder={"XXXXXXXX"}
                      id="numero_partos_terminos"
                       label={"Número de Partos a términos"}
                       validations={{type:"number"}}
                       onChange={onChange}/> 
                <Input placeholder={"XXXXXXXX"}
                      id="numero_obitos"
                       label={"Número de Óbitos"}
                       validations={{type:"number"}}
                       onChange={onChange}/> 
                <Input placeholder={"XXXXXXXX"}
                      id="numero_natimuertos"
                       label={"Número de Natimuertos"}
                       validations={{type:"number"}}
                       onChange={onChange}/> 

                <CustomItem
                  id={"gestacion"}
                  label={"Complicaciones durante la gestación"}
                  entradas={complicacionesGestacion}
                  agregar={setComplicacionesGestacion}
                  onChange={onChange}
                  fields={[
                    {cantidad:8, campos: [
                      {name:"Check", className:"w-1/12"},
                      {name:"label", className:"w-11/12", data:"nombre"},
                      ]},
                    {cantidad:10, campos: [
                        {name:"Check", className:"w-1/12"},
                        {name:"Input", className:"w-11/12", placeholder:"Agregar complicación"}
                    ]}
                  ]}/>
                <CustomItem
                  id={"parto"}
                  label={"Complicaciones durante el parto"}
                  entradas={complicacionesParto}
                  agregar={setComplicacionesParto}
                  onChange={onChange}
                  fields={
                    [
                      {cantidad:5, campos: [
                        {name:"Check", className:"w-1/12"},
                        {name:"label", className:"w-11/12", data:"nombre"},
                        ]},
                      {cantidad:10, campos: [
                          {name:"Check", className:"w-1/12"},
                          {name:"Input", className:"w-11/12", placeholder:"Agregar complicación"}
                      ]}
                    ]
                  }/>
                

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
                  onChange={onChange}
                  fields={[{cantidad:10, campos: [
                    {name:"Check", className:"w-1/12"},
                    {name:"label", className:"w-4/12", placeholder:"", data:"nombre",},
                    {name:"Select", className:"w-1/12",
                      values:{AN:"Antes", DU: "Durante", DE: "Después"}},
                    {name:"CustomDatePicker", className:"w-1/12"},
                    {name:"CustomDatePicker", className:"w-1/12"},
                    {name:"TextArea", multiLinea: false, className: "w-4/12", placeholder:"Tratamiento"}
                  ]},
                    {cantidad:3, campos:[
                        {name: "Input", className: "w-3/12", placeholder: "Nombre"},
                        {name:"TextArea", multiLinea: false, className: "w-4/12", placeholder:"Observación"}
                      ]}]}/>
              </div>
            </form>
          }
        </div>
      </div>
    </RequireAuth>
  )
}