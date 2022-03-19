import * as api from './api';
import {setUbigeos} from "./slice";
import store from '../../store'


const onRequestSuccess = response => {
  if(!response || !response.ok)
    return;
  return response.json()
    .then(function (data) {
      if (!data.error) {
        store.dispatch(setUbigeos(data))
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
      onRequestSuccess(resp);
    })
    .catch(onRequestFailed);
}