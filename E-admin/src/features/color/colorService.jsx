import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getColor = async () => {
  const response = await axios.get(`${base_url}color/getallcolor`);
  return response.data;
};

const createColor = async (color) => {
  const response = await axios.post(
    `${base_url}color/createcolor`,
    color,
    config
  );
  return response.data;
};

const getOneColor = async (id) => {
  const response = await axios.get(`${base_url}color/getonecolor/${id}`);
  return response.data;
};

const updateOnecolor = async (data) => {
  const response = await axios.patch(
    `${base_url}color/updatecolor/${data.id}`,
    { title: data.colorData.title },
    config
  );

  return response.data;
};
const deleteColor = async (id) => {
  const response = await axios.delete(
    `${base_url}color/deletecolor/${id}`,
    config
  );

  return response.data;
};

const colorService = {
  getColor,
  createColor,
  getOneColor,
  updateOnecolor,
  deleteColor,
};

export default colorService;
