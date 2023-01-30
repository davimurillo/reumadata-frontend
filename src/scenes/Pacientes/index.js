import React, {useEffect, useState} from "react";
import RequireAuth from "../Auth";
import {Titulo} from "../../components/Core/titles";
import {Agregar} from "../../components/Core/botones";
import {Table} from "../../components/Table";
import * as core from "../../services/core";
import {useSelector} from "react-redux";
import { data } from "autoprefixer";




export function Pacientes(){
  const state = useSelector(state => state.core);

  useEffect( () => {
    core.getPatients();
  }, [])

  console.log(state.patients)

  return(
    <RequireAuth>
      <div className={"bg-white m-8 max-h-screen p-8 "}>
        <div className={"flex items-center justify-between flex-wrap"}>
          <Titulo titulo={"PACIENTES"}/>
          <Agregar to={"/pacientes/nuevo"} label="PACIENTE"/>
        </div>
          { state.patients && state.patients.length > 0 &&
            <Table data_patients={state.patients}></Table>
          }
      </div>
    </RequireAuth>
  )
}