import axios from "axios";

import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getProductCategory = async () => {
  const response = await axios.get(`${base_url}category/getall-category`);
  return response.data;
};

const createProductCategory = async (data) => {
  const response = await axios.post(
    `${base_url}category/create-category`,
    data,
    config
  );
  return response.data;
};
const categoryService = { getProductCategory, createProductCategory };

export default categoryService;
