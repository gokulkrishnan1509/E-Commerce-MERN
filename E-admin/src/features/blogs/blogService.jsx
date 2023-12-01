import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getBlog = async () => {
  const response = await axios.get(`${base_url}blog/blog-all`);

  return response.data;
};



const blogService = {
  getBlog,
};

export default blogService;
