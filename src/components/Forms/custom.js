import React, {useState} from "react";
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
  const renderFields = () => {
    let restItems = [...entradas];
    let result = []
    console.log(restItems);
    fields.forEach((fieldsObj,index) => {
      for (let i = 0; i < fieldsObj.cantidad; i++) {
        const item = restItems[i];
        result.push(
          <div>
            <div key={index} className={"flex my-1 "}>
              {
                item.custom &&
                <div className={"inline-flex items-center w-1/12"}>
                  <button onClick={handleEliminar} className={"h-8 w-8 bg-red-400 rounded"}>
                    <FontAwesomeIcon icon={faTrashCan} inverse/>
                  </button>
                </div>
              }
              {fieldsObj.campos.map((field, idx) => {
                return item.custom && field.name === "Check" ? null :
                  getCampo({...field, value:field.data ? item[field.data] : ""})

              })
              }
            </div>
            {fieldsObj.campos[fieldsObj.campos.length - 1].name === "TextArea" && fieldsObj.campos[fieldsObj.campos.length - 1].multiLinea &&
              <div>
                <div className={"inline-flex items-center w-full "}>
                  <textarea placeholder={fieldsObj.campos[fields.campos.length - 1].placeholder}
                            className={"block text-sm leading-5 w-full py-2 px-3 " +
                              "border-2 border- text-slate-500 rounded-lg shadow-sm " +
                              "focus:outline-none focus:border-blue-500 "}/>
                </div>
              </div>
            }
          </div>
        )
      }
      console.log(result);
      restItems.splice(0,fieldsObj.cantidad);
    })
    return result

  }
 console.log('ID ' + props.label + " : " + props.id);
  return (
    <div className={props.className ? "my-2 " + props.className : "my-2" }>
      <span className={props.id ?
        "accordion-button " +
        "text-black " +
        "relative " +
        "flex " +
        "items-center " +
        "w-full " +
        "py-4 " +
        "text-base text-gray-800 text-left " +
        "bg-white " +
        "border-0 " +
        "rounded-none " +
        "transition " +
        "focus:outline-none " : "text-slate-900 dark:text-slate-200 text-sm font-medium" }
       data-bs-toggle="collapse" data-bs-target={"#"+props.id} aria-expanded="true"
            aria-controls={props.id}>{props.label}</span>

      <div id={props.id} className="accordion-collapse collapse show" aria-labelledby="headingOne"
           data-bs-parent="#accordionExample">
        {renderFields(entradas,fields).map((entrada) =>
          entrada
        )}


        { !props.esUnico &&
          <button onClick={handleAgregar} className={"p-2 bg-blue-400 rounded text-white"}>
            <FontAwesomeIcon icon={faCirclePlus} inverse/> Agregar Item
          </button>
        }

      </div>
    </div>

  )
}