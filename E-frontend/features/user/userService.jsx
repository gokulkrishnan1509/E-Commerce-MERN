import axios from "axios";
import { base_url } from "../../src/utils/base_url";
import { config } from "../../src/utils/axiosConfig";

const register = async (userData) => {
  const response = await axios.post(`${base_url}user/post`, userData);
  if (response.data) {
    if (response.data) {
      localStorage.setItem("customer", JSON.stringify(response.data));
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

const getUserWislist = async () => {
  const response = await axios.get(`${base_url}user/get-wishlist`, config);

  if (response.data) {
    return response.data;
  }
};

const addToCart = async (cartData) => {
  const response = await axios.patch(
    `${base_url}user/user-cart`,
    cartData,
    config
  );
  if (response.data) {
    return response.data;
  }
};

const getUserCart = async () => {
  const response = await axios.get(`${base_url}user/user-getcart`, config);

  if (response.data) {
    return response.data;
  }
};

const removeProductCart = async function (id) {
  const response = await axios.delete(
    `${base_url}user/delete-usercart/${id}`,
    config
  );
  if (response.data) {
    return response.data;
  }
};

const updateProductquanToCart = async function (data) {
  if (data) {
    const response = await axios.patch(
      `${base_url}user/update-cartitem/${data.cartItemId}/${
        data.quantity !== undefined ? data.quantity : 0
      }`,
      "",
      config
    );
    if (response.data) {
      return response.data;
    }
  }
};

const getUserOrders = async () => {
  const response = await axios.get(`${base_url}user/getmyorders`, config);
  if (response.data) {
    return response.data;
  }
};

const updateUserDetailsByToken = async (data) => {
  const response = await axios.patch(
    `${base_url}user/updateuser`,
    data,
    config
  );

  if (response.data) {
    return response.data;
  }
};

const forgotPasswordToken = async(data)=>{
const response = await axios.post(`${base_url}user/forgot`,data)
if(response.data){
  return response.data
}
}

const authService = {
  register,
  login,
  getUserWislist,
  addToCart,
  getUserCart,
  removeProductCart,
  updateProductquanToCart,
  getUserOrders,
  updateUserDetailsByToken,
  forgotPasswordToken
};

export default authService;
