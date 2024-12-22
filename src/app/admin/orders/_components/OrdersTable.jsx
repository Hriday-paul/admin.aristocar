"use client";

import { useGetAllOrderQuery } from "@/redux/api/orderApi";
import { Tooltip } from "antd";
import { ConfigProvider, Table } from "antd";
import { Eye } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import OrderModal from "./OrderModal";
import { Tag } from "antd";
import { getStatusClasses } from "@/utils/getStatusColor";

const OrdersTable = () => {
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const query = {};
  query["limit"] = 999999999999999;
  query["isPaid"] = true;
  const { data: orderRes, isFetching, isLoading } = useGetAllOrderQuery(query);
  const ordersData = orderRes?.data?.data || [];

  // ================== Table Columns ================
  const columns = [
    {
      title: "orderId",
      dataIndex: "id",
      render: (value, _, indexOf) => `# ${value}`,
    },
    {
      title: "Product Name",
      dataIndex: "product",
      render: (value) => (value?.name ? value?.name : "N/A"),
    },
    {
      title: "User",
      dataIndex: "user",
      render: (value) => (value?.name ? value?.name : "N/A"),
    },
    {
      title: "Email",
      dataIndex: "user",
      render: (value) => (value?.email ? value?.email : "N/A"),
    },
    {
      title: "Amount",
      dataIndex: "totalAmount",
    },

    {
      title: "Status",
      dataIndex: "status",
      render: (value) => (
        <Tag
          color={
            (value === "pending" && "#1b71a7") ||
            (value === "ongoing" && "#f7845e") ||
            (value === "delivered" && "#056e48") ||
            (value === "cancelled" && "#780606")
          }
          className="!text-sm"
        >
          {value}
        </Tag>
      ),
    },
    {
      title: "Order Date",
      dataIndex: "createdAt",
      render: (value) => moment(value).format("lll"),
    },

    {
      title: "Action",
      render: (value) => (
        <div className="flex-center-start gap-x-3">
          <Tooltip title="Show Details">
            <button
              onClick={() => {
                setModal(true), setModalData(value);
              }}
            >
              <Eye color="#1B70A6" size={22} />
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1B70A6",
          colorInfo: "#1B70A6",
        },
      }}
    >
      <section className="my-10">
        <Table
          loading={isLoading ?? isFetching}
          style={{ overflowX: "auto" }}
          columns={columns}
          dataSource={ordersData || []}
          scroll={{ x: "100%" }}
          pagination
        ></Table>
      </section>

      {/* Show earning modal */}
      {modalData && (
        <OrderModal
          modalData={modalData}
          setModalData={setModal}
          open={modal}
          setOpen={setModal}
        />
      )}
    </ConfigProvider>
  );
};

export default OrdersTable;
