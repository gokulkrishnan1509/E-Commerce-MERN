import axios from "axios";
import { config } from "../../src/utils/axiosConfig";
import { base_url } from "../../src/utils/base_url";

const getBlogs = async () => {
  const response = await axios.get(`${base_url}blog/blog-all`);
  if (response.data) {
    return response.data;
  }
};

const getOneBlog = async (id) => {
  const response = await axios.get(`${base_url}blog/blog-spec/${id}`);
  if (response.data) {
    return response.data;
  }
};

const BlogService = {
  getBlogs,
  getOneBlog,
};

export default BlogService;
