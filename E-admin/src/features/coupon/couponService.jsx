import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";
// ************************getting token from backend ******************

// const getTokenFromLocalStorage = localStorage.getItem("user")
//   ? JSON.parse(localStorage.getItem("user"))
//   : null;

// //   ***********************setting bearer token ******************

// const config = {
//   headers: {
//     Authorization: `Bearer ${getTokenFromLocalStorage.token}`,
//     Accept: "application/json",
//   },
// };

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

const getOneCoupon = async (id) => {
  const response = await axios.get(
    `${base_url}coupon/get-coupon/${id}`,
    config
  );

  return response.data;
};

const updateOneCoupon = async (data) => {
  const response = await axios.patch(
    `${base_url}coupon/update-coupon/${data.id}`,
    {
      name: data.couponData?.name,
      expiry: data.couponData?.expiry,
      discount: data.couponDate?.discount,
    },
    config
  );
  return response.data;
};

const deleteOneCoupon = async (id) => {
  const response = await axios.delete(
    `${base_url}coupon/delete-coupon/${id}`,
    config
  );
  return response.data;
};
const couponService = {
  getCoupon,
  postCoupon,
  getOneCoupon,
  updateOneCoupon,
  deleteOneCoupon,
};

export default couponService;
