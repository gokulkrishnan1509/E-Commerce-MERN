

import axios from "axios";

import { base_url } from "../../utils/base_url";

const getProductCategory = async () => {
  const response = await axios.get(`${base_url}category/getall-category`);
  return response.data;
};

const categoryService = { getProductCategory };

export default categoryService;


















