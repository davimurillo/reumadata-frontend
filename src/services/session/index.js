import * as api from './api';
import {setAuth} from "./slice";
import store from '../../store'

const onRequestSuccess = response => {
  if(!response || !response.ok)
    return;
  return response.json()
    .then(function (data) {
      if (!data.error) {
        store.dispatch(setAuth(data))
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


export const authenticate = (username, password) =>
  api.authenticate(username, password)
    .then(resp => {
      onRequestSuccess(resp);
    })
    .catch(onRequestFailed);