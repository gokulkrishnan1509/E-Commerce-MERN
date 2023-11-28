import axios from "axios";
import { base_url } from "../../utils/base_url";

const getBlogCate = async () => {
  const response = await axios.get(
    `${base_url}blogcategory/getall-blogcategory`
  );
  return response.data;
};

const blogCateSerivce = {
  getBlogCate,
};

export default blogCateSerivce;
