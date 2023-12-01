import axios from "axios";
import { base_url } from "../../utils/base_url";

// ************************getting token from backend ******************

const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

//   ***********************setting bearer token ******************

const config = {
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage.token}`,
    Accept: "application/json",
  },
};

// ************************Api's ******************************

const getCoupon = async () => {
  const response = await axios.get(`${base_url}coupon/all-coupons`, config);

  return response.data;
};

const postCoupon = async (coupon) => {
  const response = await axios.post(
    `${base_url}coupon/create-coupon`,
    coupon,
    config
  );
  return response.data;
};

const couponService = {
  getCoupon,
  postCoupon,
};

export default couponService;
