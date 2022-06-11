import axios from "axios";

const baseURL = 'http://localhost:8090/api/v1';

export const fetchCities = async () => {
  try {
    const response = await axios.get(`${baseURL}/cities`);
    return await response;
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
    throw err;
  }
}

export const fetchCitiesByProvinceId = async (provinceId) => {
  try {
    if (provinceId) {
      const response = await axios.get(`${baseURL}/cities?provinceId=${provinceId}`);
      return await response;
    }
    const response = await axios.get(`${baseURL}/cities`);
    return await response;
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
    throw err;
  }
}
