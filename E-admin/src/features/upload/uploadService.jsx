import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const uploadImg = async (data) => {
  const response = await axios.put(
    `${base_url}uploadimage/upload`,
    data,
    config
  );

  return response.data;
};

const deleteImd = async (data) => {
  const response = await axios.delete(`${base_url}uploadimage/delete-img/${data}`,config);
  return response.data;
};

const uploadService = {
  uploadImg,
  deleteImd,
};

export default uploadService;
