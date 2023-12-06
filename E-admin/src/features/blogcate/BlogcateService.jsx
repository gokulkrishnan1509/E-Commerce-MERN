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

const getOneBlogCate = async(id)=>{
  const response = await axios.get(`${base_url}blogcategory/getone-blogcategory/${id}`,config);
  return response.data
}

const updateOneBlogCate = async(data)=>{
  const response = await axios.patch(`${base_url}blogcategory/update-blogcategory/${data.id}`,config);
  return response.data
}

const deleteOneBlog = async(id)=>{
  const response = await axios.delete(`${base_url}blogcategory/delete-blogcategory/${id}`,config);
  return response.data
}

const blogCateSerivce = {
  getBlogCate,
  createBlog,
  getOneBlogCate,
  updateOneBlogCate,
  deleteOneBlog
};

export default blogCateSerivce;
