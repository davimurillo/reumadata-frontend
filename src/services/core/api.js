import { fetchApi } from '../api';

const endPoints = {
  getUbigeos: 'c/departamentos/'
}

export const getUbigeos = () => {
  return fetchApi(endPoints.getUbigeos, )
}