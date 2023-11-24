import React from "react";

// *******************Antd Design ********************************
import { Table } from "antd";

// *****************React Icons ****************************
import {BiEdit} from "react-icons/bi";
import {AiFillDelete}from "react-icons/ai";

const columns = [
  { title: "SNo", dataIndex: "Key" },
  { title: "Name", dataIndex: "name" },
  { title: "Product", dataIndex: "product" },
  { title: "Status", dataIndex: "status" },
];

const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    Key: i,
    name: `Edward Kind ${i}`,
    product: 32,
    status: `London, park Lane no. ${i}`,
  });
}

const Productlist = function () {
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
