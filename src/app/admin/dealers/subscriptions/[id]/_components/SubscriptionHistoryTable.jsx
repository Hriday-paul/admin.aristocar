'use client'
import { useGetSubscriptionsBy_idQuery } from '@/redux/api/income.api';
import { ConfigProvider, Table } from 'antd';
import moment from 'moment';
import React from 'react';

const SubscriptionHistoryTable = ({ id }) => {
    const query = { limit: 999999999999999 };

    const { isLoading, isFetching, data, isSuccess } = useGetSubscriptionsBy_idQuery({ id: id, query: query })

    const columns = [
        {
            title: "Serial",
            dataIndex: "key",
            render: (value, _, indexOf) => `#${indexOf + 1}`,
        },
        {
            title: "package",
            dataIndex: "subscription",
            render: (value) => (value?.package?.title || "N/A"),
        },
        {
            title: "Amount",
            dataIndex: "amount",
        },
        {
            title: "Vat Amount",
            dataIndex: "vatAmount",
        },
        {
            title: "Created",
            render: (value) => moment(value?.createdAt).format('LL'),
        },
        {
            title: "Expire",
            dataIndex: "subscription",
            render: (value) => moment(value?.expiredAt).format('LL'),
        },
        {
            title: "TranId",
            dataIndex: "tranId",
        },
        {
            title: "Car Add limit",
            dataIndex: "subscription",
            render: (value) => (value?.package?.carCreateLimit || "N/A"),
        },
    ];

    return (
        <div>

            {
                (isSuccess && data?.data?.data?.length > 0) && <h4 className='text-white text-lg'>All Payments by -- {data?.data?.data[0]?.user?.name}</h4>
            }

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
                        loading={isLoading}
                        style={{ overflowX: "auto" }}
                        columns={columns}
                        dataSource={data?.data?.data || []}
                        rowKey={(record) => record._id}
                        scroll={{ x: "100%" }}
                        pagination
                    ></Table>
                </section>
            </ConfigProvider>
        </div>
    );
};

export default SubscriptionHistoryTable;