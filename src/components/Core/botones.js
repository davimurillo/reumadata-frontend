import React from 'react';
import {style} from "typestyle";
import {Link} from "react-router-dom";

export function Agregar(props){
  return (
    <Link className={"rounded p-2 text-lg text-white bg-[#2667FF]"}
            to={props.to}>
      AGREGAR {props.label}
    </Link>
  )
}