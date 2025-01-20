"use client";

import { ConfigProvider, Input, Pagination, Popover, Table } from "antd";
import { CircleX, Search } from "lucide-react";
import { Filter } from "lucide-react";
import { useCallback, useState } from "react";
import { Tag } from "antd";
import { RiShieldStarLine } from "react-icons/ri";
import AddMostWanted from "./AddMostWanted";
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa6";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useGet_all_carsQuery, useUpdate_carMutation } from "@/redux/api/productsApi";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import toast from "react-hot-toast";

export default function ProductsContainer() {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const query = {};
  query["searchTerm"] = searchText;
  query["page"] = page;
  const { data: carData, isFetching, isLoading } = useGet_all_carsQuery(query);
  const [updateFn] = useUpdate_carMutation();

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
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastLoading = toast.loading("loading...")
        try {
          await updateFn({
            data: {
              bannerImage: [],
              discription: null,
              "isMostWanted": "false"
            }, id: id
          }).unwrap()
          Swal.fire({
            title: "Deleted!",
            text: "Most wanted car has been removed.",
            icon: "success"
          });
        } catch (err) {
          Swal.fire({
            title: "Error!",
            text: err?.message || err?.data?.message || "Something went wrong, try again",
            icon: "error"
          });
        } finally {
          toast.dismiss(toastLoading)
        }
      }
    });
  }, [updateFn])

  // ================== Table Columns ================
  const columns = [
    {
      title: "Serial",
      dataIndex: "key",
      render: (value, _, indexOf) => `#${indexOf + 1}`,
    },
    {
      title: "Car Name",
      dataIndex: "name",
      render: (value) => (value ?? "N/A"),
    },
    {
      title: "Delear",
      dataIndex: "creatorID",
      render: (value) => (value?.name ? <span>{value?.name} | {value?.phoneNumber} <br></br> {value?.email}</span> : "N/A"),
    },
    {
      title: "Car Price",
      dataIndex: "price",
      render: (value) => (value ?? "N/A"),
    },
    {
      title: "Most wanted",
      dataIndex: "isMostWanted",
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
        return value ? record?.isMostWanted == true : record?.isMostWanted !== true
      },
      render: (value) => {
        return (
          <Tag color={value ? "success" : "default"} className="!text-sm">
            {value ? 'most wanted' : "N/A"}
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
              <li className={`p-0.5 pl-2 group hover:bg-slate-50 dark:hover:bg-primary duration-200 rounded cursor-pointer`}>
                <Link href={'https://aristocar.vercel.app/details/' + value?._id} target="_blank" className='flex items-center gap-x-1 text-black group-hover:text-black'>
                  <FaEye />
                  <span>View Car</span>
                </Link>
              </li>

              {!value?.isMostWanted && <li className={`p-0.5 pl-2 hover:bg-slate-50 dark:hover:bg-primary duration-200 rounded cursor-pointer`}>
                <AddMostWanted id={value?._id}>
                  <button className='flex items-center gap-x-1'>
                    <RiShieldStarLine color="#1B70A6" size={16} />
                    Add Most wanted
                  </button>
                </AddMostWanted>
              </li>}

              {value?.isMostWanted && <>
                <li className={`p-0.5 pl-2 hover:bg-slate-50 dark:hover:bg-primary duration-200 rounded cursor-pointer`}>
                  <AddMostWanted id={value?._id} isEdit={true} defaultData={{ description: value?.discription, image: value?.bannerImage }}>
                    <button className='flex items-center gap-x-1'>
                      <CiEdit color="#1B70A6" size={16} />
                      Edit Most w.
                    </button>
                  </AddMostWanted>
                </li>

                <li className={`p-0.5 pl-2 hover:bg-slate-50 dark:hover:bg-primary duration-200 rounded cursor-pointer`}>
                  <button onClick={() => dltMstWanted(value?._id)} className='flex items-center gap-x-1'>
                    <CircleX color="#1B70A6" size={16} />
                    Remove most w.
                  </button>
                </li>
              </>}

            </ul>
          }
          trigger="click" placement="bottomRight" >
          <div role="button" className="inline-flex items-center justify-center gap-x-1 rounded bg-slate-50 shadow-2xl px-2 !py-1.5">
            <HiOutlineDotsVertical />
          </div>
        </Popover >


      ),
    },
  ];

  const onPageChange = (page) => {
    setPage(page);
  }

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
            placeholder="Search by car name"
            prefix={<Search className="mr-2 text-black" size={20} />}
            className="h-11 !rounded-lg !border !text-base"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        {/* Earning table */}
        <section className="my-5">
          <Table
            loading={isLoading || isFetching}
            style={{ overflowX: "auto" }}
            columns={columns}
            dataSource={carData?.data?.cars?.data}
            scroll={{ x: "100%" }}
            pagination={false}
          ></Table>

          <Pagination defaultCurrent={page} total={carData?.data?.cars?.meta?.total} pageSize={carData?.data?.cars?.meta?.limit} align="end" showSizeChanger={false} onChange={onPageChange} />
        </section>

      </ConfigProvider>

      {/* Create Category Modal */}


    </div>
  );
}
