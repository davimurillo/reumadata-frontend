import React, {Component} from 'react';
//import "../styles.scss";
import api from "../../../services/api"
import {style} from "typestyle";

const cuerpo = style({
  opacity: 100,
  position: "fixed",
  zIndex: 10,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "#0288D1",
})
const titulo = style({
  fontFamily: "Mogra",
  fontSize: 96,
})
const tituloData = style({
  fontFamily: "Mogra",
  fontSize: 96,
  color: "#03045E"
})
const formLogin = style({
  backgroundColor: "#11819E",
})

const doctors= require("../../../assets/img/back_doctors.png")
const enfermera= require("../../../assets/img/enfermera.png")
const login= require("../../../assets/img/back_login.jpg")

class Login extends Component {
  constructor(props) {
    super(props);
    this._login = this._login.bind(this);
  }
  _login(event){
    event.preventDefault();
    let self = this;
    api.loginAPI(this.state.email, this.state.password)
      .then((response) => {
        if (response.error) {
          self.form.showError(self.passw, login());
        }
        else {
          self.props.history.push('/')
        }
      })
      .catch((response) => {
        if (!response.is_active){
          alert('User not Authorized');
          return false
        }
        if (!response.is_confirmed){
          this.setState({isConfirm: false})
          return false
        }
        self.form.showError(self.passw, login())
      });
  }
  render(){
    return (
      <div className={"w-full bg-cover bg-center "+cuerpo} >
        <div className="flex flex-col h-full w-full items-center">
          <div className={""}>
            <span className={"titulo text-white text-center " + titulo}>REUMA</span><span className={"text-center " + tituloData}>DATA</span>
          </div>
          <div className={"flex flex-row w-full"}>
            <div className={"basis-1/2 m-20"}>
              <img className={"ml-auto"} src={doctors.default}/>
            </div>
            <div className={formLogin + " rounded-lg basis-1/2 m-20"}>
              <form className={"flex-col m-10 space-y-8 px-20"}>
                  <img className={"max-h-36 m-auto"} src={enfermera.default}/>
                  <input
                    className={"w-full h-20 px-5 py-2 text-xl text-gray-700 rounded bg-input-green"}
                    type="email"
                    id="email"
                    placeholder="Correo electrónico"
                    aria-label="email"
                    required/>
                  <input
                    className="w-full h-20 px-5 py-2 text-xl text-gray-700 bg-input-green rounded "
                    type="password"
                    id="password"
                    placeholder="Contraseña"
                    arial-label="password"
                    required
                  />
                <input
                    type={"button"}
                    onClick={this._login}
                    value={"INGRESAR"}
                    className={"w-full h-20 px-5 py-2 text-4xl text-white bg-[#03045E] " +
                        "hover:bg-[#023e8a] font-dark font-['Mogra']" } />
                </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;