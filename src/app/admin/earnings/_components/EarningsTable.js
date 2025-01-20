"use client";

import { ConfigProvider, Table } from "antd";
import clsx from "clsx";
import { ArrowRightLeft } from "lucide-react";
import { Tooltip } from "antd";
import { Eye } from "lucide-react";
import { useState } from "react";
import EarningModal from "./EarningModal";
import { useAllEarningsQuery } from "@/redux/api/income.api";
import moment from "moment";

export default function EarningsTable() {
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
      dataIndex: "package",
      render: (value) => (value?.shortTitle || "N/A"),
    },
    {
      title: "Expire",
      // dataIndex: "quantity",
      render: (value) => moment(value?.subscription?.expiredAt).format('LL'),
    },
    {
      title: "TranId",
      dataIndex: "tranId",
    },

    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Action",
      render: (value) => (
        <div className="flex flex-row gap-x-5 items-center">
          <Tooltip title="Show Details">
            <button
              onClick={() => {
                setShowEarningModal(true), setModalData(value);
              }}
            >
              <Eye color="#1B70A6" size={22} />
            </button>
          </Tooltip>
        </div>

      ),
    },
  ];

  // Dummy data
  const earningStats = [
    {
      key: "today",
      title: "Today's Earning",
      amount: earningsData?.todayEarnings,
    },

    {
      key: "total",
      title: "Total Earnings",
      amount: earningsData?.totalEarnings,
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
              "flex-center-start gap-x-4 rounded-lg px-2 lg:px-5 py-2 lg:py-4 text-lg text-white",
              stat.key === "today"
                ? "bg-secondary"
                : "bg-secondary",
            )}
          >
            <ArrowRightLeft size={24} />
            <p>
              <span>{stat.title}</span>
              <span className="pl-1 lg:pl-3 text-xl font-semibold">€{stat.amount}</span>
            </p>
          </div>
        ))}
      </section>

      <ConfigProvider
      theme={{
        token: {
          colorInfo: "#000000",
        },
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
            dataSource={earningsData?.allData || []}
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
