"use client";

import { Input, Table } from "antd";
import { Tooltip } from "antd";
import { ConfigProvider } from "antd";
import { Search, UserRoundCheck } from "lucide-react";
import userImage from "@/assets/images/user-avatar-lg.png";
import { Eye } from "lucide-react";
import { UserX } from "lucide-react";
import { useState } from "react";
import { Filter } from "lucide-react";
import Image from "next/image";
import CustomConfirm from "@/components/CustomConfirm/CustomConfirm";
import { message } from "antd";
import ProfileModal from "@/components/SharedModals/ProfileModal";
import { Tag } from "antd";
import {
  useDeleteUserMutation,
  useGetAllUserQuery,
  useUpdateUserMutation,
} from "@/redux/api/authApi";
import moment from "moment";
import toast from "react-hot-toast";
import { ErrorModal, SuccessModal } from "@/utils/modalHook";
import { dummyData } from "./dummyData";

// Dummy table Data
const data = Array.from({ length: 5 }).map((_, inx) => ({
  key: inx + 1,
  name: "Justina",
  userImg: userImage,
  email: "justina@gmail.com",
  contact: "+1234567890",
  date: "11 oct 24, 11.10PM",
  accountType: "Customer",
}));

export default function AccDetailsTable() {
  const [searchText, setSearchText] = useState("");
  const [modalData, setModalData] = useState(null);
  const query = {};
  query["verification.status"] = true;
  query["role"] = "!admin";
  query["limit"] = 999999999999999;
  query["searchTerm"] = searchText;
  // const { data: usersRes, isLoading, isFetching } = useGetAllUserQuery(query);
  const usersRes = dummyData, isLoading = false, isFetching = false
  const userData = usersRes?.data?.data || [];
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  // const [BlockUnBlockedFn, { isSuccess }] = useUpdateUserMutation();
  // const [deleteFn] = useDeleteUserMutation();



  // Block user handler
  const BlockUser = async (id) => {
    // toast.loading("blocking...", { id: "Block", duration: 2000 });
    // try {
    //   const res = await BlockUnBlockedFn({
    //     id,
    //     data: { status: "blocked" },
    //   }).unwrap();

    //   if (res?.success) {
    //     SuccessModal("this user block success");
    //   } else {
    //     ErrorModal(res?.message);
    //   }
    // } catch (error) {
    //   ErrorModal(error?.message || error?.data?.message);
    // }
  };

  const UnBlockUser = async (id) => {
    toast.loading("Unblocking...", { id: "Block", duration: 3000 });
    // try {
    //   const res = await BlockUnBlockedFn({
    //     id,
    //     data: { status: "active" },
    //   }).unwrap();

    //   if (res?.success) {
    //     SuccessModal("this user unblock success");
    //   } else {
    //     ErrorModal(res?.message);
    //   }
    // } catch (error) {
    //   ErrorModal(error?.message || error?.data?.message);
    // }
  };

  // ================== Table Columns ================
  const columns = [
    {
      title: "SL",
      dataIndex: "key",
      key: "_id",
      render: (value, record, indexOf) => `#${indexOf + 1}`,
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      render: (value, record) => {
        return <p className="font-medium">{value ? value : "N/A"}</p>;
      },
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
          text: "Delear",
          value: "delear",
        },
      ],
      filterIcon: () => (
        <Filter
          size={18}
          color="#fff"
          className="flex items-start justify-start"
        />
      ),
      onFilter: (value, record) => record.role == value,
      render: (value) => {
        return (
          <Tag color="default" className="!text-sm">
            {value === "user" ? "user" : "delear"}
          </Tag>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: [
        {
          text: "Active",
          value: "active",
        },
        {
          text: "Blocked",
          value: "blocked",
        },
      ],
      filterIcon: () => (
        <Filter
          size={18}
          color="#fff"
          className="flex items-start justify-start"
        />
      ),
      onFilter: (value, record) => record.status.indexOf(value) === 0,

      render: (value) => {
        return (
          <Tag
            color={value === "active" ? "green" : "red"}
            className="!text-sm"
          >
            {value === "active" ? "Verified" : "Not Verified"}
          </Tag>
        );
      },
    },

    {
      title: "Action",
      render: (value) => (
        <div className="flex-center-start gap-x-3">
          <Tooltip title="Show Details">
            <button
              onClick={() => {
                setProfileModalOpen(true), setModalData(value);
              }}
            >
              <Eye color="#1B70A6" size={22} />
            </button>
          </Tooltip>
          {value?.status === "active" ? (
            <Tooltip title="Block User">
              <CustomConfirm
                title="Block User"
                description="Are you sure to block this user?"
                onConfirm={() => BlockUser(value?._id)}
              >
                <button>
                  {" "}
                  <UserRoundCheck className="text-green-600" size={22} />
                </button>
              </CustomConfirm>
            </Tooltip>
          ) : (
            <Tooltip title="Unblock User">
              <CustomConfirm
                title="Unblock User"
                description="Are you sure to unblock this user?"
                onConfirm={() => UnBlockUser(value?._id)}
              >
                <button>
                  <UserX color="#F16365" size={22} />
                </button>
              </CustomConfirm>
            </Tooltip>
          )}
        </div>
      ),
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
      <div className="w-1/3 mb-3 ml-auto gap-x-5">
        <Input
          placeholder="Search by name or email"
          prefix={<Search className="mr-2 text-black" size={20} />}
          className="h-11 !rounded-lg !border !text-base"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <Table
        loading={isLoading ?? isFetching}
        style={{ overflowX: "auto" }}
        columns={columns}
        dataSource={userData}
        scroll={{ x: "100%" }}
      ></Table>

      <ProfileModal
        open={profileModalOpen}
        modalData={modalData}
        setOpen={setProfileModalOpen}
        setModalData={setModalData}
      />
    </ConfigProvider>
  );
}
