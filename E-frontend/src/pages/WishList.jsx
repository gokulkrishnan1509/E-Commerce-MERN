import React, { useEffect } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import {useSelector,useDispatch} from "react-redux"
import { getUserWislistFromServer } from "../../features/user/userSlice";
import { addProductToWishlist } from "../../features/products/productSlice";
function WishList() {
  const dispatch = useDispatch();
const{userWishListData} =useSelector((state)=> state.auth)
const {wishlist} = userWishListData ||{}
   const getWishList=()=>{
    dispatch(getUserWislistFromServer())
   }

   const removeFromWishlist =(id)=>{
    dispatch(addProductToWishlist(id))

    setTimeout(()=>{
   dispatch(getUserWislistFromServer())
    },300)
   }

  useEffect(()=>{
    const timeOut = setTimeout(()=>{
      getWishList()
    },300)

    return()=>{
      clearTimeout(timeOut)
    }
  },[])

  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />

      <div className="wishlist-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            {wishlist?.length===0 && <div className="text-center fs-3">No Data</div>}
            {wishlist?.map((item,index)=>{
              return (
                <div key={index} className="col-3">
                <div className="wishlist-card position-relative">
                  <img
                    src="images/cross.svg"
                    alt="cross"
                    className="position-absolute cross img-fluid"
                    onClick={()=>{removeFromWishlist(item._id)}}
                  />
                  <div className="wishlist-card-image bg-white">
                    <img
                      src={item?.images[0].url}
                      className="img-fluid d-block  mx-auto "
                      alt="watch"
                      width={160}
                    />
                  </div>
                  <div className="py-3 px-3">
  
                  <h5 className="title">
                   {item?.title }  
                  </h5>
                  <h6 className="price">$ {item?.price}</h6>
  
                  </div>
               
                </div>
              </div>
              )
            })}
          
          </div>
        </div>
      </div>
    </>
  );
}

export default WishList;
