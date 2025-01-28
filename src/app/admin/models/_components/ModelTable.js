"use client"
import { ConfigProvider, Input, Table, Tooltip } from 'antd';
import React, { useCallback, useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import Swal from "sweetalert2";
import EditOrAddModel from './EditOrAddModel';
import { useDelete_modelMutation, useGet_all_modelQuery } from '@/redux/api/productsApi';
import toast from 'react-hot-toast';
import { Search } from 'lucide-react';

const ModelTable = () => {
    const [searchText, setSearchText] = useState("");
    const query = {};
    query["searchTerm"] = searchText;
    query["limit"] = 99999999999999;
    const { isLoading, data, isFetching } = useGet_all_modelQuery(query);
    const [deleteFn] = useDelete_modelMutation();

    const dltModel = useCallback((id) => {
        Swal.fire({
            title: "Are you sure",
            text: "Want to remove this car model?",
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
                        text: "Your car model has been removed.",
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
            title: "Model Name",
            dataIndex: "modelName",
            render: (value) => (value ?? "N/A"),
        },
        {
            title: "Brand Name",
            dataIndex: "brandId",
            render: (value) => (value?.brandName ?? "N/A"),
        },
        {
            title: "Action",
            render: (value) => (

                <div className="flex flex-row gap-x-3 items-center">
                    <Tooltip title="Edit Model Name">
                        <EditOrAddModel defaultData={{ model_name: value?.name, brand: value?.brand, id: value?._id }} isEdit={true}>
                            <button
                                onClick={() => {
                                    setShowEarningModal(true), setModalData(value);
                                }}
                            >
                                <CiEdit className="text-xl text-amber-500" size={22} />
                            </button>
                        </EditOrAddModel>
                    </Tooltip>

                    <Tooltip title="Remove Model">
                        <button
                            onClick={() => dltModel(value?._id)}
                        >
                            <MdDeleteOutline className="text-xl text-danger" size={22} />
                        </button>
                    </Tooltip>
                </div>
            ),
        },
    ];

    return (
        <div>
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

                <div className="flex justify-between items-center gap-x-5 mb-3">
                    <EditOrAddModel isEdit={false}>
                        <button className='text-white bg-black px-4 py-2.5 rounded-md text-base mb-4 border border-zinc-600'>Add Model</button>
                    </EditOrAddModel>
                    <div className='w-1/3'>
                        <Input
                            placeholder="Search by model & brand name"
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

export default ModelTable;