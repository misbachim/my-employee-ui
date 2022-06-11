import axios from "axios";

const baseURL = 'http://localhost:8090/api/v1';

export const fetchEmployees = async (name, positionId, page, size) => {
  let url = `${baseURL}/employees?page=${page}&size=5`
  if (name) {
    url += `&name=${name}`
  }
  if (positionId) {
    url += `&positionId=${positionId}`
  }

  try {
    const response = await axios.get(url);
    return await response;
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
    throw err;
  }
}

export const fetchEmployee = async (employeeId) => {
  try {
    const response = await axios.get(`${baseURL}/${employeeId}`);
    return await response;
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
    throw err;
  }
}


