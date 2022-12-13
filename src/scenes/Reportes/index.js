import React from "react";
import RequireAuth from "../Auth";
import {Titulo} from "../../components/Core/titles";

export function Reportes(){
  return(
    <RequireAuth>
      <div className={"bg-white m-8 max-h-screen p-8 "}>
        <div className={"flex items-center justify-between flex-wrap"}>
          <Titulo titulo={"REPORTES"}/>
        </div>
      </div>
    </RequireAuth>
  )
}