import { ConfigProvider, Table } from "antd";
import moment from "moment";
import React from "react";

const Transition = ({ transactions }) => {

  const columns = [
    {
      title: "OrderId",
      dataIndex: "id",
      render: (value, record) => `#${value}`,
    },

    {
      title: "Product",
      dataIndex: "product",
      render: (value, record) => (value?.name ? value?.name : "N/A"),
    },
    {
      title: "Price",
      dataIndex: "totalAmount",
    },
    {
      title: "TranId",
      dataIndex: "trnId",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },

    {
      title: "PayAt",
      dataIndex: "updatedAt",
      render: (value) => moment(value).format("lll"),
    },
  ];

  return (
    <div className="w-full h-full rounded col-span-2">
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#0A0A0B",
            }
          }
        }}
      >
        {/* <h4 className="text-2xl font-semibold text-white">
          Recently Transactions
        </h4> */}

        <Table
          style={{ overflowX: "auto", minHeight: "320px" }}
          columns={columns}
          dataSource={transactions}
          scroll={{ x: "100%" }}
        ></Table>

        {/* Profile Modal */}
        {/* <ProfileModal open={showProfileModal} setOpen={setShowProfileModal} /> */}
      </ConfigProvider>
    </div>
  );
};

export default Transition;
