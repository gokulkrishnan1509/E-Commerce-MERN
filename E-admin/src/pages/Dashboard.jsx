import React, { useEffect, useState } from "react";

// ****************React Icons********************
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";

// ****************Antd Design*********************
import { Column } from "@ant-design/plots";
import { Table } from "antd";
// ************************React Redux*********************
import { useDispatch, useSelector } from "react-redux";
import { getAllUserOrderFromServer, getMonthlyOrderFromServer,getYearlyTotalFromServer} from "../features/auth/authSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "Key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product count",
    dataIndex: "product",
  },
  {
    title: "Total Price",
    dataIndex: "price",
  },
  {
    title:"Total Price After Discount",
    dataIndex:"dprice"
  },
  {
    title:"Status",
    dataIndex:"status"
  }
];
// const data1 = [];
// for (let i = 0; i < 46; i++) {
//   data1.push({
//     Key: i,
//     name: `Edward King ${i}`,
//     product: 32,
//     status: `London, Park Lane no. ${i}`,
//   });
// }
const DashBoard = function () {
  const dispatch = useDispatch();
  const [dataMonthly, setDataMonthly] = useState([]);
  const [dataMonthlySales, setDataMonthlySales] = useState([]);
  const [orderData,setOrderData] =useState([])

  const { getMonthlyData,getYearlyData,userOrders } = useSelector((state) => state?.auth);
  useEffect(() => {
    let timeOut = setTimeout(() => {
      dispatch(getMonthlyOrderFromServer());
      dispatch(getYearlyTotalFromServer())
      dispatch(getAllUserOrderFromServer())
    }, 300);

    return () => {
      clearTimeout(timeOut);
    };
  }, [dispatch]);

useEffect(()=>{
  const data1=[];

  for(let i=0;i<userOrders?.length;i++){
    data1.push({
      Key:i+1,
      name:userOrders[i].user?.name,
      product:userOrders[i]?.orderItems?.length,
      price:userOrders[i]?.totalPrice,
      dprice:userOrders[i]?.totalPriceAfterDiscount,
      status:userOrders[i]?.orderStatus

    })
  }
  
  setOrderData(data1)
},[userOrders])


  useEffect(() => {
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let data = [];
    let monthlyOrderCount = [];
    for (let index = 0; index < getMonthlyData?.length; index++) {
      const element = getMonthlyData[index];
      data.push({
        type: monthNames[element._id?.month],
        income: element?.amount,
      });
      monthlyOrderCount.push({
        type: monthNames[element?._id.month],
        sales: element?.count,
      });
    }

    setDataMonthly(data);
    setDataMonthlySales(monthlyOrderCount);
  }, [getMonthlyData]);

  const data = [
    {
      type: "Jan",
      sales: 38,
    },
    {
      type: "Feb",
      sales: 52,
    },
    {
      type: "Mar",
      sales: 61,
    },
    {
      type: "Apr",
      sales: 145,
    },
    {
      type: "May",
      sales: 48,
    },
    {
      type: "Jun",
      sales: 38,
    },
    {
      type: "July",
      sales: 38,
    },
    {
      type: "Aug",
      sales: 38,
    },
    {
      type: "Sep",
      sales: 40,
    },
    { type: "Oct", sales: 44 },
    { type: "Nov", sales: 88 },
    { type: "Dec", sales: 30 },
  ];
  const config = {
    data: dataMonthly,
    xField: "type",
    yField: "income",
    color: ({ type }) => {
      return "#ffd333";
    },

    label: {
      position: "top",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };

  const config2 = {
    data: dataMonthlySales,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "top",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "sales",
      },
    },
  };
  return (
    <>
      <h3 className="title">Dashboard</h3>

      <div className="d-flex justify-content-between align-items-center gap-3 dashboard-calculation">
        <div className="d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc">Total Income</p>
            {/* <h4 className="mb-0 sub-title">${getYearlyData[0]?.amount?.toLocaleString() }</h4> */}
            <h4 className="mb-0 sub-title">${getYearlyData && getYearlyData.length > 0 ? getYearlyData[0]?.amount?.toLocaleString() : 'N/A'}</h4>

          </div>
          <div className="d-flex flex-column align-items-end">
           
            <p className="mb-0 desc"> Income in Last Year from Today</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc">Total Sales</p>
            {/* <h4 className="mb-0 sub-title">{getYearlyData[0]?.count?.toLocaleString()}</h4> */}
            <h4 className="mb-0 sub-title">{getYearlyData && getYearlyData.length >0 ? getYearlyData[0]?.count.toLocaleString() :'N/A'}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            
            <p className="mb-0 desc">Sales in Last Year from Today</p>
          </div>
        </div>
       
      </div>
      <div className="d-flex justify-content-between gap-3">
        <div className="mt-4 flex-grow-1 w-50">
          <h3 className="mb-5 desc">Income statics</h3>
          <div
            style={{ width: "100%", height: "400px" }}
            className="chart-layout"
          >
            <Column {...config} />
          </div>
        </div>
        <div className="mt-4 flex-grow-1 w-50">
          <h3 className="mb-5 desc">Sales statics</h3>
          <div
            style={{ width: "100%", height: "400px" }}
            className="chart-layout"
          >
            <Column {...config2} />
          </div>
        </div>
      </div>

      <div className="mt-4 title">
        <h3 className="mb-5">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={orderData} rowKey={"Key"} />
        </div>
        {/* <div className="my-4">
          <h3 className="mb-4">Recent Reviews</h3>
           <div className="">
            <div></div>
            <div></div>
           </div>
        </div> */}
      </div>
    </>
  );
};

export default DashBoard;
