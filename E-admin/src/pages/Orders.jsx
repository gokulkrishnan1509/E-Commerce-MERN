import React from "react";

// ************Ant Design ********************
import { Table } from "antd";
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
    name: `Edward King ${i}`,
    product: 32,
    status: `London, Park Lane no .${i}`,
  });
}

function Orders() {
  return (
    <>
      <div>
        <h3>Orders</h3>
        <div>
        <Table columns={columns} dataSource={data1} rowKey={"Key"} />
        </div>
      </div>
    </>
  );
}

export default Orders;
