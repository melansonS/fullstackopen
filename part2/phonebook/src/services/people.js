import axios from "axios";
// const baseUrl = "https://whispering-lake-51690.herokuapp.com/api/persons";
// const baseUrl = "http://localhost:3001/api/persons";
const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createPerson = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request.then((response) => response.data);
};

const updatePerson = (id, newPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, newPerson);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const exports = { getAll, createPerson, updatePerson, deletePerson };

export default exports;
