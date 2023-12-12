import axios from "axios";

import { base_url } from "../../src/utils/base_url";
import { config } from "../../src/utils/axiosConfig";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/all-product`);
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

const productService = {
  getProducts,
  addToWishlist,
  getSingleProduct,
};

export default productService;
