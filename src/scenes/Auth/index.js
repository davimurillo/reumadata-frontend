import React, {useState, createContext} from 'react';
import {
    useLocation,
    Navigate,
} from "react-router-dom";
import {Header} from "../../components/Header"
import {Menu} from "../../components/Menu";
import {style} from "typestyle";
import {useSelector} from "react-redux";

const styleBody = style({
    height: "90%"
})


export default function RequireAuth({ children }) {
    const state = useSelector(state => state.user)
    let location = useLocation();

    if (state.tokens) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return(
      <div className={"flex flex-col h-screen"}>
        <Header/>
        <div className={"flex flex-row " + styleBody}>
            <Menu/>
            <div className={"bg-[#ADE8F4] w-full overflow-auto"}>
                {children}
            </div>
        </div>
      </div>
    );
}