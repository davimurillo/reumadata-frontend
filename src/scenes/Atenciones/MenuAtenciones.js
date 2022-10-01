import React from "react";
import RequireAuth from "../Auth";
import {Titulo} from "../../components/Core/titles";
import {Card} from "../../components/Card";

const doctors= require("../../assets/img/back_doctors.png")


export function MenuAtenciones(){
  const enfermedades = [
    {title:"Lupus", body: "", image:doctors, link:"/atenciones/nuevo/lupus"},
    {title:"Esclerosis Sistemica", body: "", image:doctors},
    {title:"Osteoporosis", body: "", image:doctors},
    {title:"Gota", body: "", image:doctors},
    {title:"Espondilo artritis", body: "", image:doctors},
    {title:"Miopatias", body: "", image:doctors},
    {title:"Artritis reumatoide", body: "", image:doctors}
  ]


  return(
    <RequireAuth>
      <div className={"bg-white m-8 max-h-screen p-8 "}>
        <div className={"flex items-center justify-between flex-wrap"}>
          <Titulo titulo={"Menu de nueva atención"}/>
        </div>

      </div>
      <div className={"m-8 max-h-screen p-8 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5"}>
        { enfermedades.map((enfermedad) => {
          return(
            <Card
              {...enfermedad}
            />
          )
        })}
      </div>

    </RequireAuth>
  )
}