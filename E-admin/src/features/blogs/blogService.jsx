import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getBlog = async () => {
  const response = await axios.get(`${base_url}blog/blog-all`);

  return response.data;
};

const createBlog = async (blog) => {
  const response = await axios.post(`${base_url}blog/blog-post`, blog, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const response = await axios.delete(
    `${base_url}blog/blog-delete/${id}`,
    config
  );
  return response.data;
};

const updateBlog = async (data) => {
  const response = await axios.patch(
    `${base_url}blog/blog-update/${data.id}`,
    config
  );
  return response.data;
};

const getOneBlog = async (id) => {
  const response = await axios.get(`${base_url}blog/blog-spec/${id}`);
  return response.data;
};

const blogService = {
  getBlog,
  createBlog,
  deleteBlog,
  updateBlog,
  getOneBlog,
};

export default blogService;
