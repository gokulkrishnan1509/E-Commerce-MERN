import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";
// *********************getting token from backend*******************
// const getTokenFromLocalStorage = localStorage.getItem("user")
//   ? JSON.parse(localStorage.getItem("user"))
//   : null;

// // *********************setting bearer token************************
// const config = {
//   headers: {
//     Authorization: getTokenFromLocalStorage
//       ? `Bearer ${getTokenFromLocalStorage.token}`
//       : null,
//     Accept: "application/json",
//   },
// };

// ********************************Api's*****************************
const login = async (userData) => {
  const response = await axios.post(`${base_url}user/admin-login`, userData);
  if (response["data"]) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const getUserOrder = async (id) => {
  const response = await axios.get(
    `${base_url}user/getorderbyuser/${id}`,
    config
  );
  if (response.data) {
    return response.data;
  }
};

const getMonthlyOrder = async function () {
  const response = await axios.get(
    `${base_url}user/getMonthWiseByOrderIncome`,
    config
  );
  if (response.data) {
    return response.data;
  }
};

const getYearlyStates = async function () {
  const response = await axios.get(
    `${base_url}user/getYearlyTotalOrders`,
    config
  );

  if (response.data) {
    return response.data;
  }
};

const getAllOrder = async function () {
  const response = await axios.get(`${base_url}user/getallorders`, config);
  if (response.data) {
    return response.data;
  }
};

const updateUserOrder = async function (data) {
  const response = await axios.patch(
    `${base_url}user/updateOrder/${data.id}`,
    {status:data.status},
    config
  );

  if (response.data) {
    return response.data;
  }
};

const authService = {
  login,
  getUserOrder,
  getMonthlyOrder,
  getYearlyStates,
  getAllOrder,
  updateUserOrder,
};

export default authService;
