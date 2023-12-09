import axios from "axios";
import { base_url } from "../../src/utils/base_url";
const register = async (userData) => {
  const response = await axios.post(`http://localhost:1509/user/post`, userData);
  if (response.data) {
      if(response.data){
        localStorage.setItem("customer" ,JSON.stringify(response.data))
      }
    return response.data;
  }
};

const login = async (data) => {
  const response = await axios.post(`${base_url}user/login`, data);
  if (response.data) {
    return response.data;
  }
};

const authService = {
  register,
  login,
};

export default authService;
