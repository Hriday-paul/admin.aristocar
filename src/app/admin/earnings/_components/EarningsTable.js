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
import EarningModal from "./EarningModal";
import { useAllEarningsQuery } from "@/redux/api/income.api";
import { dummyData } from "./dummyData";

export default function EarningsTable() {
  const [showEarningModal, setShowEarningModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  // const { data: earningsRes, isFetching, isLoading } = useAllEarningsQuery();

  const earningsRes = dummyData
  const isFetching = false,  isLoading = false

  const earningsData = earningsRes?.data || [];

  // ================== Table Columns ================
  const columns = [
    {
      title: "Serial",
      dataIndex: "key",
      render: (value, _, indexOf) => `#${indexOf + 1}`,
    },
    {
      title: "Delear Name",
      dataIndex: "user",
      render: (value) => (value?.name ? value?.name : "N/A"),
    },
    {
      title: "Email",
      dataIndex: "user",
      render: (value) => (value?.email ? value?.email : "N/A"),
    },
    // {
    //   title: "Product",
    //   dataIndex: "product",
    //   render: (value) => (value?.name ? value?.name : "N/A"),
    // },
    {
      title: "package",
      dataIndex: "quantity",
      render: (value) => (value == 1 ? "Basic" : value == 2 ? "Medium" : "N/A"),
    },
    {
      title: "TranId",
      dataIndex: "trnId",
    },

    {
      title: "Amount",
      dataIndex: "totalAmount",
    },
    {
      title: "Action",
      render: (value) => (
        <Tooltip title="Show Details">
          <button
            onClick={() => {
              setShowEarningModal(true), setModalData(value);
            }}
          >
            <Eye color="#1B70A6" size={22} />
          </button>
        </Tooltip>
      ),
    },
  ];

  // Dummy data
  const earningStats = [
    {
      key: "today",
      title: "Today's Earning",
      amount: earningsData?.todayIncome,
    },

    {
      key: "total",
      title: "Total Earnings",
      amount: earningsData?.totalIncome,
    },
  ];

  return (
    <div>
      {/* Earning stats */}
      <section className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
        {earningStats?.map((stat) => (
          <div
            key={stat.key}
            className={clsx(
              "flex-center-start gap-x-4 rounded-lg px-5 py-4 text-lg text-white",
              stat.key === "today"
                ? "bg-secondary"
                : "bg-secondary",
            )}
          >
            <ArrowRightLeft size={24} />
            <p>
              {stat.title}
              <span className="pl-3 text-xl font-semibold">€{stat.amount}</span>
            </p>
          </div>
        ))}
      </section>

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

        {/* Show earning modal */}
        <EarningModal
          modalData={modalData}
          setModalData={setModalData}
          open={showEarningModal}
          setOpen={setShowEarningModal}
        />
      </ConfigProvider>
    </div>
  );
}
