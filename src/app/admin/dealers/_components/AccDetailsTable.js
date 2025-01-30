"use client";

import { Input, Popover, Table } from "antd";
import { ConfigProvider } from "antd";
import { Check, CirclePlus, CircleX, LoaderCircle, Scroll, Search, SquareCheckBig, Trash2, UserRoundCheck } from "lucide-react";
import { UserX } from "lucide-react";
import { useState } from "react";
import { Filter } from "lucide-react";
import CustomConfirm from "@/components/CustomConfirm/CustomConfirm";
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
import { FaEye } from "react-icons/fa6";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Link from "next/link";
import AddFreeAccess from "./AddFreeAccess";
import AddApproval from "./AddApproval";
import { MdOutlinePrint } from "react-icons/md";
import PrintAllPayments from "./PrintAllPayments";

export default function AccDetailsTable() {
  const [searchText, setSearchText] = useState("");
  const [modalData, setModalData] = useState(null);
  const query = {};
  query["verification.status"] = true;
  // query["role"] = "user";
  query["role"] = "dealer";
  query["limit"] = 999999999999999;
  query["searchTerm"] = searchText;

  const { data: usersRes, isLoading, isFetching } = useGetAllUserQuery(query);
  const userData = usersRes?.data?.data || [];
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [updateFn] = useUpdateUserMutation();
  const [deleteFn] = useDeleteUserMutation();



  // update user handler
  const updateUser = async (id, data, successMessage) => {
    const loadingToast = toast.loading("Update loading...");
    try {
      const res = await updateFn({
        id,
        data: data,
      }).unwrap();

      if (res?.success) {
        SuccessModal(successMessage);
      } else {
        ErrorModal(res?.message);
      }
    } catch (error) {
      ErrorModal(error?.message || error?.data?.message || "Something went wrong, try again");
    }
    finally {
      toast.dismiss(loadingToast);
    }
  };

  // ----------delete user--------
  const deleteUser = async (id) => {
    const loadingToast = toast.loading("Delete loading...");
    try {
      const res = await deleteFn(id).unwrap();

      if (res?.success) {
        SuccessModal("User delete successfully");
      } else {
        ErrorModal(res?.message);
      }
    } catch (error) {
      ErrorModal(error?.message || error?.data?.message || "Something went wrong, try again");
    }
    finally {
      toast.dismiss(loadingToast);
    }
  };

  // ================== Table Columns ================
  const columns = [
    {
      title: "SL",
      dataIndex: "key",
      key: "_id",
      render: (value, _, indexOf) => `#${indexOf + 1}`,
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      render: (value) => {
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
      render: (value) => (value ? value : "N/A"),
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      render: (value) => (value ? value : "N/A"),
    },
    {
      title: "Dealership",
      dataIndex: "dealership",
      render: (value) => (value ? value : "N/A"),
    },
    {
      title: "Free Access",
      render: (value) => (value?.freeLimit > 0 ? <section>
        <p>Add Limit : {value?.freeLimit}</p>
        <p>Expire date : {moment(value?.freeExpairDate).format('LL')}</p>
      </section> : "N/A"),
      filters: [
        {
          text: "Free access",
          value: "free",
        },
        {
          text: "Premium access",
          value: "premium",
        },
      ],
      filterIcon: () => (
        <Filter
          size={18}
          color="#fff"
          className="flex items-start justify-start"
        />
      ),
      onFilter: (value, record) => value == 'free' ? record?.freeLimit > 0 : !record?.freeLimit,
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
          text: "Approved Dealer",
          value: "active",
        },
        {
          text: "Pending Dealer",
          value: "pending",
        },
      ],
      filterIcon: () => (
        <Filter
          size={18}
          color="#fff"
          className="flex items-start justify-start"
        />
      ),
      onFilter: (value, record) => value == 'pending' ? !record?.isApproved : record?.isApproved,
      render: (value, record) => {
        return (
          <Tag color="default" className="!text-sm flex !flex-row gap-1 items-center">
            {value === "user" ? "user" : value === "dealer" ? "dealer" : "admin"}
            {(value == 'dealer') ? !record?.isApproved ? <LoaderCircle className="animate-spin h-2.5 inline-block" /> : <Check className="text-green-500 h-3 inline-block" /> : <></>}
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
            {value === "active" ? "Active" : "Blocked"}
          </Tag>
        );
      },
    },

    {
      title: "Action",
      render: (value) => (
        <Popover

          content={
            <ul className="rounded-sm z-999999 w-36 bg-white dark:bg-boxdark-2 text-slate-900 dark:text-slate-200 space-y-1">

              <li onClick={() => {
                setProfileModalOpen(true), setModalData(value);
              }} className={`p-0.5 pl-2 hover:bg-slate-50 dark:hover:bg-primary duration-200 rounded cursor-pointer`}>

                <button className='flex items-center gap-x-1'>
                  <FaEye />
                  <span>View More</span>
                </button>

              </li>

              <li className={`p-0.5 pl-2 hover:bg-slate-50 dark:hover:bg-primary duration-200 rounded cursor-pointer`}>

                {value?.status === "active" ? (
                  <CustomConfirm
                    title="Block User"
                    description="Are you sure to block this user?"
                    onConfirm={() => updateUser(value?._id, { status: "blocked" }, 'User Block successfully')}
                  >
                    <button className='flex items-center gap-x-1'>
                      <UserRoundCheck className="text-green-600" size={16} />
                      Block user
                    </button>
                  </CustomConfirm>
                ) : (

                  <CustomConfirm
                    title="Unblock User"
                    description="Are you sure to unblock this user?"
                    onConfirm={() => updateUser(value?._id, { status: "active" }, "User unblock successfully")}
                  >
                    <button className='flex items-center gap-x-1'>
                      <UserX color="#F16365" size={16} />
                      Unblock user
                    </button>
                  </CustomConfirm>
                )}

              </li>

              {
                value?.role == 'dealer' && <li className={`p-0.5 pl-2 hover:bg-slate-50 dark:hover:bg-primary duration-200 rounded cursor-pointer`}>

                  {!value?.isApproved ? (
                    <AddApproval userId={value?._id}>
                      <button className='flex items-center gap-x-1'>
                        <SquareCheckBig className="text-green-600" size={16} />
                        Approve dealer
                      </button>
                    </AddApproval>

                  ) : (
                    <CustomConfirm
                      title="Remove approve dealer"
                      description="Are you sure remove approve this dealer for listing?"
                      onConfirm={() => updateUser(value?._id, { isApproved: false }, "Remove dealer approve successfully")}
                    >
                      <button className='flex items-center gap-x-1'>
                        <CircleX color="#F16365" size={16} />
                        Remove approval
                      </button>
                    </CustomConfirm>
                  )}

                </li>
              }

              {/* <li className={`p-0.5 pl-2 hover:bg-slate-50 dark:hover:bg-primary duration-200 rounded cursor-pointer`}>
                <CustomConfirm
                  title="Delete user"
                  description="Are you sure delete this user/dealer ?"
                  onConfirm={() => deleteUser(value?._id)}
                >
                  <button className='flex items-center gap-x-1'>
                    <Trash2 color="#ff0000" size={16} />
                    Delete
                  </button>
                </CustomConfirm>
              </li> */}

              {
                (value?.role == 'dealer' && value?.isApproved) && <li className={`p-0.5 pl-2 hover:bg-slate-50 dark:hover:bg-primary duration-200 rounded cursor-pointer`}>

                  <Link href={`/admin/dealers/subscriptions/${value?._id}`} className='flex items-center gap-x-1'>
                    <Scroll color="#000000" size={16} />
                    Payment hist.
                  </Link>
                </li>
              }
              {
                (value?.role == 'dealer' && value?.isApproved) && <li className={`p-0.5 pl-2 hover:bg-slate-50 dark:hover:bg-primary duration-200 rounded cursor-pointer`}>
                  <AddFreeAccess userId={value?._id}>
                    <button className='flex items-center gap-x-1'>
                      <CirclePlus color="#1B70A6" size={16} />
                      Add Free Access
                    </button>
                  </AddFreeAccess>
                </li>

              }

            </ul>
          }
          trigger="click" placement="bottomRight">
          <div role="button" className="inline-flex items-center justify-center gap-x-1 rounded bg-slate-50 shadow-2xl px-2 !py-1.5">
            <HiOutlineDotsVertical />
          </div>
        </Popover>
      ),
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
      <div className="w-full mb-3 ml-auto gap-x-5 flex flex-col lg:flex-row justify-between items-center">
        <PrintAllPayments>
          <button className={`inline-flex items-center justify-center gap-x-1 rounded btn-default !px-4 !py-3 text-sm bg-white`}>
            <p className='flex items-center gap-x-1'>
              <MdOutlinePrint />
              <span>Print Payments</span>
            </p>
          </button>
        </PrintAllPayments>
        <div className="w-1/3">
          <Input
            placeholder="Search by name or email"
            prefix={<Search className="mr-2 text-black" size={20} />}
            className="h-11 !rounded-lg !border !text-base"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>

      <Table
        loading={isLoading ?? isFetching}
        style={{ overflowX: "auto" }}
        columns={columns}
        dataSource={userData}
        rowKey={(record) => record._id}
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
