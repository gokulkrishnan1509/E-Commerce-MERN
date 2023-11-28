import axios from "axios";
import { base_url } from "../../utils/base_url";

const getProductsfromServer = async () => {
  const response = await axios.get(`http://localhost:1509/product/all-product`);
  return response.data;
};

const productService = { getProductsfromServer };

export default productService;
