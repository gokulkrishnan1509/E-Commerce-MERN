import axios from "axios";

import { base_url } from "../../src/utils/base_url";
import { config } from "../../src/utils/axiosConfig";

// const getProducts = async (data) => {
//   const response = await axios.get(
//     `${base_url}product/all-product?${
//       data?.tag ? `tags=${data?.tag}&&` : ""
//     } `
//   );
//   return response.data;
// };

const getProducts = async (data) => {
  try {
    const queryParams = new URLSearchParams();
    if (data?.brand) {
      queryParams.append("brand", data?.brand);
    }
    if (data?.tag) {
      queryParams.append("tags", data?.tag);
    }

    if (data?.category) {
      queryParams.append("category", data?.category);
    }

    if (data?.minPrice) {
      queryParams.append(`price[gte]`, data?.minPrice);
    }

    if (data?.maxPrice) {
      queryParams.append(`price[lte] `, data?.maxPrice);
    }

    if(data?.sort){
      queryParams.append("sort",data?.sort)
    }
    const response = await axios.get(
      `${base_url}product/all-product?${queryParams.toString()}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
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
