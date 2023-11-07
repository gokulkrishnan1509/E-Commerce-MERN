const mongoose = require("mongoose");
const CustomError = require("../utils/customError")
const validateMongoDbId=(id)=>{
    const isValid = mongoose.Types.ObjectId.isValid(id);

    if(!isValid){
        throw new CustomError("this id is not valid or not found ")
    }

}

module.exports =validateMongoDbId;