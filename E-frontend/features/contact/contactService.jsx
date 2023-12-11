import axios from "axios";
import { config } from "../../src/utils/axiosConfig";

const postQuery = async function (contactData) {
  const response = await axios.post(
    `${base_url}query/create-query`,
    contactData
  );
  if (response.data) {
    return response.data;
  }
};

export const contactService = {
  postQuery,
};
