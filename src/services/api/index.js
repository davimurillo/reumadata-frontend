import apiConfig from '../../services/config'
import _ from "lodash";
import store from '../../store';

export const fetchApi = (
  endPoint,
  payload = undefined,
  method = "get",
  headers = {},
) => {
  console.log("DATA:", payload);
  const user = store.getState().user
  const accessToken = user.tokens ? user.tokens.access_token : "";
  console.log("ACCESS");
  console.log(accessToken);
  let params = {
    headers: _.pickBy({
        ...(accessToken? { Authorization: `Bearer ${accessToken}` } : {}),
        ...headers
      },
      item => !_.isEmpty(item)
    ),
    method: method.toLowerCase(),
    body: payload
  };

  async function handleResponses (response) {

    if (!response)
      return response;

    if (!response.ok && response.status == 401) {

      let state = await NetInfo.fetch();      // Finding out what happened

      if (state.isConnected) {              // Something bad, because we are connected and even so we were rejected in the server;
        session.revoke();
        AsyncStorage.removeItem('lastEvent');
      }
      return null;
    }
    return response;
  };

  return fetch(`${apiConfig.url}${endPoint}`, params)
    .then(handleResponses)
    .catch(e => {
      if (e.response && e.response.json)
        e.response.json().then(json => { throw (json  ? json :  e) })
      else
        throw e;
    });
};