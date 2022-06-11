import axios from "axios";

const baseURL = 'http://localhost:8090/api/v1';

export const fetchBankAccounts = async () => {
  try {
    const response = await axios.get(`${baseURL}/bank-accounts`);
    return await response;
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
    throw err;
  }
}
