import axios from "axios";

import { base_url } from "../../src/utils/base_url";
import { config } from "../../src/utils/axiosConfig";

const getProducts = async (data) => {
  const response = await axios.get(
    `${base_url}product/all-product?${
      data?.brand ? `brand=${data?.brand}&&` : ""
    } ${data?.tag ? `brand=${data?.tag}&&` : ""}`
  );
  return response.data;
};

const addToWishlist = async (prodId) => {
  const response = await axios.patch(
    `${base_url}product/wishlist`,
    { prodId },
    config
  );
  if (response.data) {
    return response.data;
  }
};

const getSingleProduct = async (id) => {
  const response = await axios.get(`${base_url}product/product-id/${id}`);
  if (response.data) {
    return response.data;
  }
};

const rateProduct = async (data) => {
  console.log(data);
  const response = await axios.patch(`${base_url}product/rating`, data, config);
  if (response.data) {
    return response.data;
  }
};
const productService = {
  getProducts,
  addToWishlist,
  getSingleProduct,
  rateProduct,
};

export default productService;
