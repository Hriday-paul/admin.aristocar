"use client";

import { ConfigProvider } from "antd";
import { Table } from "antd";
import { Filter } from "lucide-react";
import { Tag } from "antd";
import { useState } from "react";
import ProfileModal from "@/components/SharedModals/ProfileModal";
import moment from "moment";

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
    // {
    //   title: "Contact",
    //   dataIndex: "phoneNumber",
    //   render: (value, record) => (value ? value : "N/A"),
    // },
    // {
    //   title: "Contact",
    //   dataIndex: "phoneNumber",
    //   render: (value, record) => (value ? value : "N/A"),
    // },
    {
      title: "Join Date",
      dataIndex: "createdAt",
      render: (value) => moment(value).format("LL"),
    },
    {
      title: "Account Type",
      dataIndex: "role",

      filters: [
        {
          text: "User",
          value: "user",
        },
        {
          text: "Dealer",
          value: "dealer",
        }
      ],
      filterIcon: () => (
        <Filter
          size={18}
          color="#fff"
          className="flex items-start justify-start"
        />
      ),
      onFilter: (value, record) => value == 'pending' ? (!record?.isApproved && record.role == 'dealer') : record.role == value,
      render: (value, record) => {
        return (
          <Tag color="default" className="!text-sm flex !flex-row gap-1 items-center">
            {value === "user" ? "user" : value === "dealer" ? "dealer" : "admin"}
            {/* {(value == 'dealer') ? !record?.isApproved ? <LoaderCircle className="animate-spin h-2.5 inline-block" /> : <Check className="text-green-500 h-3 inline-block" /> : <></>} */}
          </Tag>
        );
      },
    },
  ];

  return (
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
      <div className="flex flex-row justify-between items-center gap-x-5">
        <h4 className="text-2xl font-semibold text-white">
          Recently Joined Users
        </h4>
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
