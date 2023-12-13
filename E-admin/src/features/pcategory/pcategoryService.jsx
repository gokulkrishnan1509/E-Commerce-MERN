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

const getOneCateProduct = async (id) => {
  const response = await axios.get(`${base_url}category/getcate/${id}`);
  return response.data;
};

async function deleteOneCateProduct(id) {
  const response = await axios.delete(
    `${base_url}category/delete-category/${id}`,
    config
  );

  return response.data;
}

const updateCateProduct = async (data) => {
  const response = await axios.patch(
    `${base_url}category/update-category/${data.id}`, {title:data.productCateProduct} ,config);
  return response.data;
};

const categoryService = {
  getProductCategory,
  createProductCategory,
  getOneCateProduct,
  deleteOneCateProduct,
  updateCateProduct
};

export default categoryService;
