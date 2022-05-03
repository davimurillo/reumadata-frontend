import React from "react";
import * as componentes from './index'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlus, faTrashCan} from "@fortawesome/free-solid-svg-icons";

export const CustomItem = function(props){
  const {entradas, fields} = props;
  const handleAgregar = (e) => {
    e.preventDefault();
    props.agregar([...entradas, {nombre:"", custom:true}])
  }
  const handleEliminar = (e, index) => {
    e.preventDefault();
    let nuevaLista = entradas.slice();
    nuevaLista.pop(index)
    props.agregar(nuevaLista)
  }
  const getCampo = (field) => {
    const CustomComponent = componentes[field.name];
    return (
      <CustomComponent {...field} />
    )
  }

  return (
    <div className={props.className ? "my-2 " + props.className : "my-2" }>
      <span className="text-slate-900 dark:text-slate-200 text-sm font-medium">{props.label}</span>
      { entradas && entradas.map((item, index) => {
        return (
          <>
            <div key={index} className={"flex my-1 "}>
              {
                item.custom &&
                <div className={"inline-flex items-center w-1/12"}>
                  <button onClick={handleEliminar} className={"h-8 w-8 bg-red-400 rounded"}>
                    <FontAwesomeIcon icon={faTrashCan} inverse />
                  </button>
                </div>
              }
              { fields.map((field,idx) => {

                return item.custom && field.name === "Check" ?  null :
                    getCampo({...field, value:item.nombre})

                })
              }
            </div>
            { fields[fields.length -1].name == "Observation" &&
              <div>
                <div className={"inline-flex items-center w-full "}>
                  <textarea className={"block text-sm leading-5 w-full py-2 px-3 " +
                    "border-2 border- text-slate-500 rounded-lg shadow-sm " +
                    "focus:outline-none focus:border-blue-500 "}/>
                </div>
              </div>
            }
          </>
        )
      })}
      { !props.esUnico &&
        <button onClick={handleAgregar} className={"p-2 bg-blue-400 rounded text-white"}>
          <FontAwesomeIcon icon={faCirclePlus} inverse/> Agregar Item
        </button>
      }
    </div>
  )
}