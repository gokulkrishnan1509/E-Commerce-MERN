import React, { useEffect } from "react";

// *******************Antd Design ********************************
import { Table } from "antd";

// ***********************React Icons ****************************
import { BiEdit } from "react-icons/bi";
// import {AiFillDelete} from "react-icons/ai"
import { AiFillDelete } from "react-icons/ai";

// ******************React - Redux ******************************
import { useDispatch, useSelector } from "react-redux";

// ************************Features Components**************************
import { getProducts } from "../features/product/productSlice";

// *******************Router ***********************
import { Link } from "react-router-dom";
// sorter: (a, b) => a.name.localeCompare(b.name),

const columns = [
  { title: "SNo", dataIndex: "Key" },
  {
    title: "Title",
    dataIndex: "title",

    sorter: (a, b) => a.title.localeCompare(b.title),
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.localeCompare(b.brand),
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.localeCompare(b.category),
  },
  { title: "Color", dataIndex: "color" },

  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price.localeCompare(b.price),
  },
  { title: "Action", dataIndex: "action" },
];

// console.log(products)
const Productlist = function () {
  const dispatch = useDispatch();

  useEffect(() => {
    let timeOut = setTimeout(() => {
      dispatch(getProducts());
    }, 500);
    return () => {
      clearTimeout(timeOut);
    };
  }, [dispatch]);
  const { products } = useSelector((state) => state.product);
  const data1 = [];
  for (let i = 0; i < products.length; i++) {
    data1.push({
      Key: i + 1,
      title: products[i].title,
      brand: products[i].brand,
      category: products[i].catagory,
      color: products[i].color,
      price: `${products[i].price}`,
      action: (
        <>
          <Link className="fs-3 text-danger" to="/">
            <BiEdit />
          </Link>
          <Link className=" fs-3 ms-3 text-danger" to="/">
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }

  return (
    <>
      <div>
        <h3 className="mb-4">Product List</h3>
        <div>
          <Table columns={columns} dataSource={data1} rowKey={"Key"} />
        </div>
      </div>
    </>
  );
};

export default Productlist;
