"use client"
import { ConfigProvider, Input, Popover, Table, Tooltip } from 'antd';
import React, { useCallback, useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import Swal from "sweetalert2";
import EditOrAddBrand from './EditOrAddBrand';
import { useDeleteBrandMutation, useGet_all_brandsQuery } from '@/redux/api/productsApi';
import toast from 'react-hot-toast';
import { CircleX, Filter, Search } from 'lucide-react';
import Image from 'next/image';
import { HiOutlineDotsVertical } from 'react-icons/hi';

const BrandsTable = () => {
    const [searchText, setSearchText] = useState("");
    const query = {};
    query["searchTerm"] = searchText;
    query["limit"] = 999999999999999;
    const { isLoading, data, isFetching } = useGet_all_brandsQuery(query);
    const [deleteFn] = useDeleteBrandMutation()

    const dltBrand = useCallback(async (id) => {
        console.log(id)

        Swal.fire({
            title: "Are you sure",
            text: "Want to remove this car brand?",
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
                    await deleteFn(id).unwrap()
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your car brand has been removed.",
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
    }, [deleteFn])

    const columns = [
        {
            title: "Serial",
            dataIndex: "key",
            render: (value, _, indexOf) => `#${indexOf + 1}`,
        },
        {
            title: "Brand Name",
            dataIndex: "brandName",
            render: (value) => (value ?? "N/A"),
        },
        {
            title: "Logo",
            dataIndex: "image",
            render: (value) => {
                return value ? <Image src={value} height={500} width={500} className='object-cover h-20 w-20 rounded-sm' alt='brand logo' /> : "N/A"
            },
        },
        {
            title: "View Home",
            dataIndex: "isHome",
            render: (value) => (value ? 'Yes' : "No"),
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
                return record?.isHome == value
            },
        },
        {
            title: "Action",
            render: (value) => (

                <Popover
                    content={
                        <ul className="rounded-sm z-999999 w-36 bg-white dark:bg-boxdark-2 text-slate-900 dark:text-slate-200 space-y-1">



                            <li className={`p-0.5 pl-2 hover:bg-slate-50 dark:hover:bg-primary duration-200 rounded cursor-pointer`}>
                                <EditOrAddBrand defaultData={{ brand_name: value?.brandName, id: value?._id, isHome: value?.isHome || false, image: value?.image }} isEdit={true}>
                                    <button className='flex items-center gap-x-1'>
                                        <CiEdit color="#1B70A6" size={16} />
                                        Edit Brand
                                    </button>
                                </EditOrAddBrand>
                            </li>

                            <li className={`p-0.5 pl-2 hover:bg-slate-50 dark:hover:bg-primary duration-200 rounded cursor-pointer`}>
                                <button onClick={() => dltBrand(value?._id)} className='flex items-center gap-x-1'>
                                    <CircleX color="#1B70A6" size={16} />
                                    Delete
                                </button>
                            </li>


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


                <div className="flex justify-between items-center gap-x-5 mb-3">
                    <EditOrAddBrand isEdit={false}>
                        <button className='text-white bg-black px-4 py-2.5 rounded-md text-base border border-zinc-600'>Add Brand</button>
                    </EditOrAddBrand>
                    <div className='w-1/3'>
                        <Input
                            placeholder="Search by brand name"
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
                    dataSource={data?.data?.data}
                    rowKey={(record) => record._id}
                    scroll={{ x: "100%" }}
                    pagination
                ></Table>
            </ConfigProvider>
        </div>
    );
};

export default BrandsTable;