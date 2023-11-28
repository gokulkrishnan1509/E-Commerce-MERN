import axios from "axios";

import { base_url } from "../../utils/base_url";

const getEnquiry=async()=>{
    const response = await axios.get(`${base_url}query/get-allquery`);
    return response.data;
}

const enquiryService ={getEnquiry};

export default enquiryService;