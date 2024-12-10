import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Adjust this to your backend URL

export const fetchMenus = async () => {
  const response = await axios.get(`${API_BASE_URL}`);
  return response.data;
};

export const createMenu = async (menu) => {
  const response = await axios.post(`${API_BASE_URL}`, menu);
  return response.data;
};
