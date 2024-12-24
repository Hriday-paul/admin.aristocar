"use client"
import { ConfigProvider, Table, Tooltip } from 'antd';
import React, { useCallback } from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import clsx from "clsx";
import { ArrowRightLeft, Search } from "lucide-react";
import Image from "next/image";
import { Filter } from "lucide-react";
import { Eye } from "lucide-react";
import { useState } from "react";
import { Tag } from "antd";
import { useAllEarningsQuery } from "@/redux/api/income.api";
import { RiShieldStarLine } from "react-icons/ri";
import Swal from "sweetalert2";
import EditOrAddBrand from './EditOrAddBrand';

const BrandsTable = () => {
    const dummyData = [
        {
            id: 1,
            name: "SUV"
        },
        {
            id: 2,
            name: "BMW"
        },
        {
            id: 3,
            name: "Audit"
        },
        {
            id: 4,
            name: "SUV"
        },
    ]

    const dltMstWanted = useCallback((id) => {
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
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your car brand has been removed.",
                    icon: "success"
                });
            }
        });
    }, [])

    const columns = [
        {
            title: "Serial",
            dataIndex: "key",
            render: (value, _, indexOf) => `#${indexOf + 1}`,
        },
        {
            title: "Brand Name",
            dataIndex: "name",
            render: (value) => (value ?? "N/A"),
        },
        {
            title: "Action",
            render: (value) => (

                <div className="flex flex-row gap-x-3 items-center">
                    <Tooltip title="Edit Brand Name">
                        <EditOrAddBrand defaultData={{ brand_name: value?.name }} isEdit={true}>
                            <button
                                onClick={() => {
                                    setShowEarningModal(true), setModalData(value);
                                }}
                            >
                                <CiEdit className="text-xl text-amber-500" size={22} />
                            </button>
                        </EditOrAddBrand>
                    </Tooltip>

                    <Tooltip title="Remove Brand">
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
                <EditOrAddBrand isEdit={false}>
                    <button className='text-white bg-primary-green px-4 py-2.5 rounded-md text-base mb-4'>Add Brand</button>
                </EditOrAddBrand>

                <Table
                    // loading={isLoading ?? isFetching}
                    style={{ overflowX: "auto" }}
                    // columns={columns}
                    columns={columns}
                    // dataSource={earningsData?.allTransitions || []}
                    dataSource={dummyData}
                    scroll={{ x: "100%" }}
                    pagination={false}
                ></Table>
            </ConfigProvider>
        </div>
    );
};

export default BrandsTable;