import React, {Component, useState} from "react";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashCan, faCirclePlus, faEdit} from "@fortawesome/free-solid-svg-icons";


// function Field(props){
//   const [handler,setHandler] = useState(props.handler);
//   const [initial,setInitial] = useState('');
//   const [value, setValue] = useState('');
//   const [isValid, setIsValid] = useState(true);
//   const [isModified, setIsModified] = useState(false);
//   const [erros, setErrors] = useState([]);
//
//   function changeValue(value){
//     this.setState({value: value});
//     this.setState({isModified: true});
//     if (this.state.handler){
//       if (this.props.keyItem){
//         this.state.handler(this.props.field, value, this.props.keyItem)
//       }
//       else{
//         this.state.handler(this.props.field, value)
//       }
//     }
//   }
//
//
//   function componentDidMount(){
//     this.loadState(this.props);
//   }
//
//   function componentWillReceiveProps(nextProps) {
//     this.loadState(nextProps);
//   }
//
//   function loadState(props){
//     if (!isModified) {
//       let initial = this.state.initial;
//       if (props.model && props.field) {
//         initial = getField(props.model, props.field)
//         this.setState({initial: initial});
//       }
//       if (initial !== this.state.value) {
//         this.setState({value:initial});
//       }
//     }
//     if (props.stateUpdate && props.stateUpdate !== value) {
//       this.setValue(props.stateUpdate);
//     }
//   }
//
// }

function extField(FieldComponent){
  return (props) => (

    <div className={props.className ? "my-2 " + props.className : "my-2" }>
      {props.label &&
        <span className="text-slate-900 dark:text-slate-200 text-sm font-medium">{props.label}</span>
      }
        <FieldComponent {...props}/>
    </div>
  )
}

export const Check = function (props){
  return(
    <label className="inline-flex items-center w-1/12">
      <input type={"checkbox"} className="form-checkbox h-6 w-6"/>
    </label>
  )
}

export const Input = extField(function(props){
  const validations = props.validations
  const type = validations && validations.type ? validations.type : "text"
  return (
      <input className={"block text-sm leading-5 w-full py-2 px-3 " +
        "border-2 border- text-slate-500 rounded-lg shadow-sm " +
        "focus:outline-none focus:border-blue-500 "}
        placeholder={props.placeholder} value={props.value}
        type = {type}
      />
  )
})

export const Select = extField(function(props){
  return(
    <select className={"block text-sm leading-5 w-full py-2 px-3 " +
      "border-2 border- text-slate-500 rounded-lg shadow-sm " +
      "focus:outline-none focus:border-blue-500"}>
      {Object.keys(props.values).map((key)=>{
        return <option key={key} value={key} className="">{props.values[key]}</option>
      })}
    </select>
  )
})

export const CustomDatePicker = extField(function (props){
  const [startDate, setStartDate] = useState(new Date());

  return(
      <DatePicker selected={startDate}
                  className={"block text-sm leading-5 w-full py-2 px-3 " +
                    "border-2 border- text-slate-500 rounded-lg shadow-sm " +
                    "focus:outline-none focus:border-blue-500 " }
                  onChange={(date) => setStartDate(date)}/>
  )
})

export const SelectPlace = extField(function(props){
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [pais, setPais] = useState("")

  const changePais = (event) =>{
    setPais(event.target.value);
  }

  const changeDep =  (event) =>{
    const department = props.values.find(obj => obj['name']  === event.target.value)
    setProvinces(department['provinces'])
  }

  const changePro =  (event) =>{
    const province = provinces.find(obj => obj['name']  === event.target.value)
    setDistricts(province['districts'])
  }


  return(
    <div className={"grid grid-cols-2 "}>
      <select placeholder={"País"} onChange={changePais}  className={"block text-sm leading-5 py-2 px-3 " +
        "border-2 border- text-slate-500 rounded-lg shadow-sm " +
        "focus:outline-none focus:border-blue-500"}>
        <option disabled selected>Selecciona el país</option>
        <option key={'PE'} value={'PE'} className="">Peruano</option>
        <option key={'EX'} value={'EX'} className="">Extranjero</option>
        })}
      </select>
      { pais === "PE" &&
      <>
      <select placeholder={"País"} onChange={changeDep} className={"block text-sm leading-5py-2 px-3 " +
        "border-2 border- text-slate-500 rounded-lg shadow-sm " +
        "focus:outline-none focus:border-blue-500"}>
        <option disabled selected>Selecciona el departamento</option>
        {props.values.map((item, key)=>{
          return <option
            key={key}
            value={item['name']}
            className="">{item['name']}</option>
        })}
      </select>
      <select onChange={changePro} className={"block text-sm leading-5 py-2 px-3 " +
        "border-2 border- text-slate-500 rounded-lg shadow-sm " +
        "focus:outline-none focus:border-blue-500"}>
        <option disabled selected>Selecciona la provincia</option>
        {provinces.map((item, key)=>{
          return <option key={key} value={item['name']} className="">{item['name']}</option>
        })}
      </select>
      <select className={"block text-sm leading-5 py-2 px-3 " +
        "border-2 border- text-slate-500 rounded-lg shadow-sm " +
        "focus:outline-none focus:border-blue-500"}>
        <option disabled selected>Selecciona el distrito</option>
        {districts.map((item, key)=>{
          return <option key={key} value={item['id']} className="">{item['name']}</option>
        })}
      </select></>}
    </div>
  )
})

export const BoolText = extField(function(props){

  const {entradas} = props;
  const handleEliminar = (e, index) => {
    e.preventDefault();
    let nuevaLista = entradas.slice();
    nuevaLista.pop(index)
    props.agregar(nuevaLista)
  }
  const handleAgregar = (e) => {
    e.preventDefault();
    props.agregar([...entradas, {nombre:""}])
  }
  return (
    <>
    { entradas && entradas.map((item, index) => {
    return(
    <div className={"flex my-2"}>
      <Input placeholder={props.placeholder} className={"w-10/12"}
      />
      <button onClick={(e) => handleEliminar(e, index)} className={"w-1/12 bg-red-400 mx-2 rounded"}>
        <FontAwesomeIcon icon={faTrashCan} inverse />
      </button>
      {index === entradas.length - 1 &&
      <button onClick={handleAgregar} className={"w-1/12 bg-blue-400 mx-2 rounded"}>
        <FontAwesomeIcon icon={faCirclePlus} inverse />
      </button>}
    </div>
    )})}
   </>
  )
})

export const ItemModel = extField(function(props){

  const {entradas} = props;
  const handleAgregar = (e) => {
    e.preventDefault();
    props.agregar([...entradas, {nombre:""}])
  }
  const handleEliminar = (e, index) => {
    e.preventDefault();
    let nuevaLista = entradas.slice();
    nuevaLista.pop(index)
    props.agregar(nuevaLista)
  }
  return (
    <>
      { entradas && entradas.map((item, key) => {
        return(
            <div className={"flex my-2 justify-between"}>
              <label className="inline-flex items-center w-1/12">
                <input type={"checkbox"} className="form-checkbox h-6 w-6"/>
              </label>
              <Input value={item['nombre']}
                     className={"w-7/12"}
                     placeholder={props.placeholder}
              />

              <Select values={{AN:"Antes", AC: "Actual"}} className={"w-2/12"}/>
              <button onClick={handleEliminar} className={"w-1/12 bg-red-400 mx-2 rounded"}>
                <FontAwesomeIcon icon={faTrashCan} inverse />
              </button>
              {key === entradas.length - 1 &&
                <button onClick={handleAgregar} className={"w-1/12 bg-blue-400 mx-2 rounded"}>
                  <FontAwesomeIcon icon={faCirclePlus} inverse />
                </button>}
            </div>

        )})}
    </>
  )
})

export const Observation = function (props){
  const [areaView, setAreView] = useState(false);

  const newNode = (
    <div className={"inline-flex items-center w-full "}>
      <textarea />
    </div>
  )
  const addObs = (e) => {
    e.preventDefault();


    setAreView(true)
    console.log("FINAL:", e.target.parentNode);
  }
  return(
    <div className={"inline-flex items-center w-1/12 pl-0.5"}>
      <button onClick={addObs} className={"h-8 w-8 bg-amber-500 rounded items-center"}>
        <FontAwesomeIcon icon={faEdit} inverse />
      </button>
    </div>

  )
}


