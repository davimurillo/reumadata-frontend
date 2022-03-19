import apiConfig from '../config';
import { fetchApi } from '../api';
const endPoints = {
  authenticate: 'auth/token/',
  revoke: 'c/auth/revoke-token/',
  convert: 'c/auth/convert-token/',
  signup: 'v2/auth/register'

};

export const authenticate = (username, password) => {
  const formData = {
    "grant_type": "password",
    "username": username,
    "password": password,
    "client_id": apiConfig.clientId
  }
  return fetchApi(endPoints.authenticate, JSON.stringify(formData), 'post',{});
};