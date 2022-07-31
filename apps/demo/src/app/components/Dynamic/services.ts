import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/api/';

export const getClassTypes = () => {
  return axios.get('classTypes').then((res) => res.data);
};

export const getLimits = (classType: string) => {
  return axios.get(`limits?classType=${classType}`).then((res) => res.data);
};
