import axios from "axios";
import { config } from "../../src/utils/axiosConfig";
import { base_url } from "../../src/utils/base_url";

const postQuery = async function (contactData) {
  const response = await axios.post(
    `${base_url}query/create-query`,
    contactData
  );
  if (response.data) {
    return response.data;
  }
};

 const contactService = {
  postQuery,
};


export default contactService;