"use client";

import { ConfigProvider, Input, Table } from "antd";
import clsx from "clsx";
import { ArrowRightLeft, Search } from "lucide-react";
import userImage from "@/assets/images/user-avatar-lg.png";
import Image from "next/image";
import { Filter } from "lucide-react";
import { Tooltip } from "antd";
import { Eye } from "lucide-react";
import { useCallback, useState } from "react";
import { Tag } from "antd";
import { useAllEarningsQuery } from "@/redux/api/income.api";
import { RiShieldStarLine } from "react-icons/ri";
import AddMostWanted from "./AddMostWanted";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";

export default function ProductsContainer() {
  const [searchText, setSearchText] = useState("");
  const [showEarningModal, setShowEarningModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  // const { data: earningsRes, isFetching, isLoading } = useAllEarningsQuery();

  // const earningsData = earningsRes?.data || [];

  const dltMstWanted = useCallback((id) => {
    Swal.fire({
      title: "Are you sure",
      text: "Want to remove this car from most wanted?",
      customClass: {
        title: "text-2xl text-primary font-poppins",
        cancelButton: "bg-danger text-white",
      },
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#38CB6E",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your car has been removed.",
          icon: "success"
        });
      }
    });
  }, [])

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
      render: (value) => (value ?? "N/A"),
    },
    {
      title: "Delear Name",
      dataIndex: "delear_name",
      render: (value) => (value ?? "N/A"),
    },
    {
      title: "Car Price",
      dataIndex: "car_price",
      render: (value) => (value ?? "N/A"),
    },
    {
      title: "Most wanted",
      dataIndex: "most_wanted",
      filters: [
        {
          text: "Yes",
          value: true,
        },
        {
          text: "No",
          value: false,
        },
      ],
      filterIcon: () => (
        <Filter
          size={18}
          color="#fff"
          className="flex items-start justify-start"
        />
      ),
      onFilter: (value, record) => {
        return value ? record?.most_wanted == true : record?.most_wanted !== true
        // return record?.most_wanted == value
      },
      render: (value) => {
        return (
          <Tag color={value ? "success" : "default"} className="!text-sm">
            {value ? "most wanted" : "N/A"}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      render: (value) => (
        !value?.most_wanted ? <Tooltip title="Add Most Wanted">
          <AddMostWanted id={value?.id}>
            <button
              onClick={() => {
                setShowEarningModal(true), setModalData(value);
              }}
            >
              <RiShieldStarLine color="#1B70A6" size={22} />
            </button>
          </AddMostWanted>
        </Tooltip>
          :
          <div className="flex flex-row gap-x-3 items-center">
            <Tooltip title="Edit Most Wanted">
              <AddMostWanted id={value?.id}>
                <button
                  onClick={() => {
                    setShowEarningModal(true), setModalData(value);
                  }}
                >
                  <CiEdit className="text-xl text-amber-500" size={22} />
                </button>
              </AddMostWanted>
            </Tooltip>
            <Tooltip title="Remove Most Wanted">
              <button
                onClick={() => dltMstWanted(value?.id)}
              >
                <MdDeleteOutline className="text-xl text-danger" size={22} />
              </button>
            </Tooltip>
          </div>
      ),
    },
  ];

  const dummyData = [
    {
      car_name: "Ford Explorer 2023",
      delear_name: "Mr. David",
      car_price: 150,
      id: 1,
      most_wanted: false
    },
    {
      car_name: "Ford Explorer 2023",
      delear_name: "Mr. David",
      car_price: 150,
      id: 2,
      most_wanted: true
    },
    {
      car_name: "Ford Explorer 2023",
      delear_name: "Mr. David",
      car_price: 150,
      id: 3
    },
    {
      car_name: "Ford Explorer 2023",
      delear_name: "Mr. David",
      car_price: 150,
      id: 4,
      most_wanted: true
    },
    {
      car_name: "Ford Explorer 2023",
      delear_name: "Mr. David",
      car_price: 150,
      id: 5
    },
  ]

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

        <div className="w-1/3 mb-3 ml-auto gap-x-5">
          <Input
            placeholder="Search by delear name or email | car name"
            prefix={<Search className="mr-2 text-black" size={20} />}
            className="h-11 !rounded-lg !border !text-base"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        {/* Earning table */}
        <section className="my-5">
          <Table
            // loading={isLoading ?? isFetching}
            style={{ overflowX: "auto" }}
            // columns={columns}
            columns={columns}
            // dataSource={earningsData?.allTransitions || []}
            dataSource={dummyData}
            scroll={{ x: "100%" }}
            pagination
          ></Table>
        </section>

      </ConfigProvider>

      {/* Create Category Modal */}


    </div>
  );
}
