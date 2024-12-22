"use client";

import { ConfigProvider, Table } from "antd";
import clsx from "clsx";
import { ArrowRightLeft } from "lucide-react";
import userImage from "@/assets/images/user-avatar-lg.png";
import Image from "next/image";
import { Filter } from "lucide-react";
import { Tooltip } from "antd";
import { Eye } from "lucide-react";
import { useState } from "react";
import { Tag } from "antd";
import { useAllEarningsQuery } from "@/redux/api/income.api";
import { RiShieldStarLine } from "react-icons/ri";

export default function ProductsContainer() {
  const [showEarningModal, setShowEarningModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const { data: earningsRes, isFetching, isLoading } = useAllEarningsQuery();

  const earningsData = earningsRes?.data || [];

  // ================== Table Columns ================
  const columns = [
    {
      title: "Serial",
      dataIndex: "key",
      render: (value, _, indexOf) => `#${indexOf + 1}`,
    },
    {
      title: "Car Name",
      dataIndex: "car_name",
      render: (value) => (value?.name ? value?.name : "N/A"),
    },
    {
      title: "Delear Name",
      dataIndex: "user",
      render: (value) => (value?.name ? value?.name : "N/A"),
    },
    {
      title: "Car Price",
      dataIndex: "price",
      render: (value) => (value?.price ? value?.name : "N/A"),
    },
    {
      title: "Action",
      render: (value) => (
        <Tooltip title="Add Most Wanted">
          <button
            onClick={() => {
              setShowEarningModal(true), setModalData(value);
            }}
          >
            <RiShieldStarLine color="#1B70A6" size={22} />
          </button>
        </Tooltip>
      ),
    },
  ];

  return (
    <div>

      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#0A0A0B",
            }
          }
        }}
      >

        {/* Earning table */}
        <section className="my-10">
          <Table
            loading={isLoading ?? isFetching}
            style={{ overflowX: "auto" }}
            columns={columns}
            dataSource={earningsData?.allTransitions || []}
            scroll={{ x: "100%" }}
            pagination
          ></Table>
        </section>
        
      </ConfigProvider>
    </div>
  );
}
