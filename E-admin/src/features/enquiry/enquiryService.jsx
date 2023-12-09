import axios from "axios";

import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getAllEnquiry = async () => {
  const response = await axios.get(`${base_url}query/get-allquery`);
  return response.data;
};

const getOneEnquiry = async (id) => {
  const response = await axios.get(`${base_url}query/get-onequery/${id}`);
  return response.data;
};

const updateEnquiry = async (data) => {
  const response = await axios.patch(
    `${base_url}query/update-query/${data.id}`,
    {status:data.enqData},
    config
  );
  return response.data;
};

const deleteEnquiry = async (id) => {
  const response = await axios.delete(
    `${base_url}query/delete-query/${id}`,
    config
  );
  return response.data;
};

const enquiryService = {
  getAllEnquiry,
  getOneEnquiry,
  updateEnquiry,
  deleteEnquiry,
};

export default enquiryService;
