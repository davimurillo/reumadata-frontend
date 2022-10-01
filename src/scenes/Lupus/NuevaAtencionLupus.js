import React, {useState} from "react";
import RequireAuth from "../Auth";
import {Titulo} from "../../components/Core/titles";
import {Input, Select, TextArea} from "../../components/Forms";
import {CustomItem} from "../../components/Forms/custom";
import {MANIFESTACIONES_SISTEMICAS} from "../Lupus/constants";

export function NuevoLupus(){
  const [activeTab, setActiveTab] = useState('MANIFESTACIONES SISTÉMICAS');
  const [manifestaciones, setManifestaciones] = useState(MANIFESTACIONES_SISTEMICAS)

  const tabs = {
    MS: 'MANIFESTACIONES SISTÉMICAS',
    MC: 'MUCOCUTÁNEO',
    ME: 'MUSCULOESQUELÉTICO',
    NP: 'NEUROPSIQUIÁTRICO',
    OL: 'OTORRINOLARINGOLÓGICO',
    RE: 'RESPIRATORIO',
    CV: 'CARDIOVASCULAR',
    GT: 'GASTROINTESTINAL',
    OF: 'OFTALMOLÓGICO',
    RN: 'RENAL',
    HT: 'HEMATOLÓGICO',
  }
  return(
    <RequireAuth>
      <div className={"bg-white m-8 max-h-screen p-8 "}>
        <div className={"flex items-center justify-between flex-wrap"}>
          <Titulo titulo={"Nueva atención de Lupus"}/>
        </div>
        <ul className='mt-1 border-b-2 solid flex items-stretch cursor-pointer rounded'>
          {Object.values(tabs).map((tab, index) => {
            return (
              <li key={index} className={'flex py-2 px-6 rounded-t-lg bg-white items-center ' +
                (activeTab === tab ? 'bg-white border-b-4 border-sky-600 ' : 'text-gray-500')}
                  onClick={()=> setActiveTab(tab)}
              >{tab}</li>
            )
          })}
        </ul>
        <div>
          {activeTab === tabs.MS &&
          <form>
            <div className={"grid grid-cols-2 space-x-2"}>
              <CustomItem
                id={"manifestaciones"}
                label={"Manifestaciones sistemicas"}
                entradas={manifestaciones}
                agregar={setManifestaciones}
                fields={[{cantidad:4, campos: [
                  {name:"Check", className:"w-1/12"},
                  {name:"Input", data:"nombre", className:"w-11/12", placeholder:"Agregar manifestación"}
                ]},{cantidad:1, campos: [
                  {name:"Check", className:"w-1/12"},
                  {name:"Input", data:"nombre", className:"w-5/12", placeholder:"Agregar manifestación"},
                  {name:"Input", className:"w-2/12", placeholder:"Peso"},
                  {name:"Input", className:"w-2/12", placeholder:"Talla"},
                  {name:"Select", className:"w-3/12", values:{
                    N:"Normal < 5%", L: "Leve : 5 – 10%", M:"Moderado : 11-15%", S:"Severo ≥ 16%"}},
                  ]},{cantidad:1, campos:[{name:"Check", className:"w-1/12"},
                  {name: "Input", className: "w-2/12", placeholder: "Detalle"}
                ]}]
              }>

              </CustomItem>

            </div>
          </form>
          }
        </div>
      </div>

    </RequireAuth>
  )
}