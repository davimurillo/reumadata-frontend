import * as api from './api';
import {setUbigeos, setPatients} from "./slice";
import store from '../../store'


const onRequestSuccess = (response, trigger) => {
  if(!response || !response.ok)
    return;
  return response.json()
    .then(function (data) {
      if (!data.error) {
        if (trigger == "ubigeos"){
          store.dispatch(setUbigeos(data))
        }
        if (trigger == "patients"){
          store.dispatch(setPatients(data))
        }
        // usersData.me().then( resp =>
        //   store.dispatch(actionCreators.update({user: resp.user}))
        // )
        //setSessionTimeout(tokens.expires_in);
      }
      return {status: response.status, data: data};
    });
};

const onRequestFailed = (exception) => {
  // clearSession();
  throw exception;
};

export const getUbigeos = () => {
  return api.getUbigeos()
    .then(resp => {
      onRequestSuccess(resp, "ubigeos");
    })
    .catch(onRequestFailed);
}

export const getPatients = () => {
  return api.getPatients()
    .then(resp => {
      onRequestSuccess(resp, "patients");
    })
    .catch(onRequestFailed);
}

export const savePatientData = (data) => {
  return api.postPatient(data)
    .then(resp => {
      onRequestSuccess(resp, "patients");
    })
    .catch(onRequestFailed);
}