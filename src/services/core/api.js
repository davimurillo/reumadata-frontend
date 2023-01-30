import { method } from 'lodash';
import { fetchApi } from '../api';

const endPoints = {
  getUbigeos: 'c/departamentos/',
  patient: 'patients/'
}

export const getUbigeos = () => {
  return fetchApi(endPoints.getUbigeos, )
}

export const getPatients = () => {
  return fetchApi(endPoints.patient, )
}

export const postPatient = (data) => {
  return fetchApi(endPoints.patient,data,"post")
}