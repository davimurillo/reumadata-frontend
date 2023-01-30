import React from "react";
import RequireAuth from "../Auth";
import {Titulo} from "../../components/Core/titles";
import {Agregar} from "../../components/Core/botones";
import {Table} from "../../components/Table";

export function Atenciones(){
  return(
    <RequireAuth>
      <div className={"bg-white m-8 max-h-screen p-8 "}>
        <div className={"flex items-center justify-between flex-wrap"}>
          <Titulo titulo={"ATENCIONES"}/>
          <Agregar to={"/atenciones/nuevo"} label="ATENCIÓN"/>
        </div>
        <Table data_patients={[]}>

        </Table>
      </div>
    </RequireAuth>
  )
}