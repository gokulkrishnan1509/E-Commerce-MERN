import axios from "axios";
import { base_url } from "../../utils/base_url";
import {config} from "../../utils/axiosConfig"

const getBlogCate = async () => {
  const response = await axios.get(
    `${base_url}blogcategory/getall-blogcategory`
  );
  return response.data;
};

const createBlog = async (blog) => {
  const response = await axios.post(
    `${base_url}blogcategory/create-blogcategory`,
    blog,
    config
  );

  return response.data;
};

const blogCateSerivce = {
  getBlogCate,
  createBlog,
};

export default blogCateSerivce;
