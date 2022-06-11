import axios from "axios";

const baseURL = 'http://localhost:8090/api/v1';

export const fetchPositions = async () => {
  try {
    const response = await axios.get(`${baseURL}/positions`);
    return await response;
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
    throw err;
  }
}
