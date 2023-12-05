import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";
const getBrand = async () => {
  const response = await axios.get(`${base_url}brand/brand-getAll`);
  return response.data;
};

const createBrand = async (brand) => {
  const response = await axios.post(
    `${base_url}brand/brand-create`,
    brand,
    config
  );
  return response.data;
};

const getOneBrand = async (id) => {
  const response = await axios.get(`${base_url}brand/brand-id/${id}`);
  return response.data;
};

const updateBrand = async (brand) => {
  const response = await axios.patch(
    `${base_url}brand/brand-update/${brand.id}`,
    { title: brand.brandData.title },
    config
  );

  return response.data;
};

const deleteBrand = async (id) => {
  const response = await axios.delete(
    `${base_url}brand/brand-delete/${id}`,
    config
  );

  return response.data;
};

const brandService = {
  getBrand,
  createBrand,
  getOneBrand,
  updateBrand,
  deleteBrand,
};

export default brandService;
