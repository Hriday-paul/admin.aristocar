"use client";

import { ConfigProvider } from "antd";
import { Table } from "antd";
import { UserX } from "lucide-react";
import { Eye } from "lucide-react";
import { Filter } from "lucide-react";
import Image from "next/image";
import userImage from "@/assets/images/user-avatar-lg.png";
import { Tooltip } from "antd";
import { Tag } from "antd";
import { useState } from "react";
import ProfileModal from "@/components/SharedModals/ProfileModal";
import moment from "moment";

// Dummy Data

const RecentUserTable = ({ userDetails }) => {
  const [showProfileModal, setShowProfileModal] = useState(false);

  // =============== Table columns ===============
  const columns = [
    {
      title: "SL",
      dataIndex: "key",
      key: "_id",
      render: (value, record, indexOf) => `#${indexOf + 1}`,
    },
    // {
    //   title: "Name",
    //   key: "serial",
    //   dataIndex: "serial",
    //   render: (value, record) => {
    //     return (
    //       <></>
    //       //   <div className="flex-center-start gap-x-2">
    //       //   <Image
    //       //     src={record.profile}
    //       //     alt="User avatar"
    //       //     width={40}
    //       //     height={40}
    //       //     className="rounded-full aspect-square"
    //       //   />
    //       //   <p className="font-medium">{value}</p>
    //       // </div>
    //     );
    //   },
    // },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Contact",
      dataIndex: "phoneNumber",
      render: (value, record) => (value ? value : "N/A"),
    },
    {
      title: "Contact",
      dataIndex: "phoneNumber",
      render: (value, record) => (value ? value : "N/A"),
    },
    {
      title: "Join Date",
      dataIndex: "createdAt",
      render: (value) => moment(value).format("LL"),
    },
    {
      title: "Account Type",
      dataIndex: "role",

      render: (value) => {
        return (
          <Tag color="default" className="!text-sm">
            {value === "user" ? "user" : "delear"}
          </Tag>
        );
      },
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "#0A0A0B",
          }
        }
      }}
    >
      <div className="flex flex-row justify-between items-center gap-x-5">
        <h4 className="text-2xl font-semibold text-white">
          Recently Joined Users
        </h4>
        <select className="bg-secondary border border-gray-400 text-white p-1 focus:outline-none outline-none rounded-sm" defaultValue={"all"}>
          <option value={'all'}>All</option>
          <option value={'user'}>User</option>
          <option value={'delear'}>Delear</option>
        </select>
      </div>


      <div className="my-2">
        <Table
          style={{ overflowX: "auto" }}
          columns={columns}
          dataSource={userDetails}
          scroll={{ x: "100%" }}
        ></Table>
      </div>

      {/* Profile Modal */}
      <ProfileModal open={showProfileModal} setOpen={setShowProfileModal} />
    </ConfigProvider>
  );
};

export default RecentUserTable;
