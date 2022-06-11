import axios from "axios";

const baseURL = 'http://localhost:8090/api/v1';

export const fetchEmployees = async () => {
  try {
    const response = await axios.get(`${baseURL}/employees`);
    return await response;
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
    throw err;
  }
}

export const fetchEmployee = async (employeeId) => {
  try {
    const response = await axios.get(`${baseURL}/employees/${employeeId}`);
    return await response;
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
    throw err;
  }
}

export const fetchEmployeeKtp = async (employeeId) => {
  try {
    const response = await axios.get(`${baseURL}/employees/${employeeId}/ktp`);
    return await response.data;
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
    throw err;
  }
}

export const postEmployee = async (employee) => {
  try {
    const response = await axios.post(`${baseURL}/employees`, employee);
    return await response;
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
    throw err;
  }
}

export const putEmployee = async (employee) => {
  try {
    const response = await axios.put(`${baseURL}/employees/${employee.id}`, employee);
    return await response;
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
    throw err;
  }
}

export const deleteEmployee = async (employeeId) => {
  try {
    const response = await axios.delete(`${baseURL}/employees/${employeeId}`);
    return await response;
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
    throw err;
  }
}

