import React from 'react';
import {style} from "typestyle";

export function Nombre(props){
  const titulo = style({
    fontFamily: "Mogra",
    fontSize: props.size,
  })
  const tituloData = style({
    fontFamily: "Mogra",
    fontSize: props.size,
    color: "#03045E"
  })
  return (
    <div className={"pt-2"}>
      <span className={"titulo text-white text-center " + titulo}>REUMA</span>
      <span className={"text-center " + tituloData}>DATA</span>
    </div>
  )
}

export function Titulo(props){
  return (
    <h1 className={"text-2xl text-[#03045E]"}> {props.titulo}</h1>
  )
}