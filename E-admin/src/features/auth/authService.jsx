import axios from "axios";
import { base_url } from "../../utils/base_url";

// *********************getting token from backend*******************
const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

// *********************setting bearer token************************
const config = {
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage.token}`,
    Accept: "application/json",
  },
};

// ********************************Api's*****************************
const login = async (userData) => {
  const response = await axios.post(`${base_url}user/admin-login`, userData);
  // console.log(response["data"])
  if (response["data"]) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};
const getOrder = async () => {
  // console.log(getTokenFromLocalStorage.token);

  const response = await axios.get(`${base_url}user/getall-orders`, config);
  // console.log(response["data"]);
  return response["data"];
};

const authService = {
  login,
  getOrder,
};

export default authService;
