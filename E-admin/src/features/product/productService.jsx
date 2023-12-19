import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getProductsfromServer = async () => {
  const response = await axios.get(`${base_url}product/all-product`);
  return response.data;
};

const createProduct = async (product) => {
  const response = await axios.post(
    `${base_url}product/product-post`,
    product,
    config
  );
  return response.data;
};

const productService = { getProductsfromServer, createProduct };

export default productService;
