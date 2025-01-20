'use client'
import { useGetSubscriptionsBy_idQuery } from '@/redux/api/income.api';
import { ConfigProvider, Table } from 'antd';
import moment from 'moment';
import React from 'react';

const SubscriptionHistoryTable = ({ id }) => {
    const { isLoading, isFetching, data, isSuccess } = useGetSubscriptionsBy_idQuery(id)

    const columns = [
        {
            title: "Serial",
            dataIndex: "key",
            render: (value, _, indexOf) => `#${indexOf + 1}`,
        },
        {
            title: "package",
            dataIndex: "package",
            render: (value) => (value?.shortTitle || "N/A"),
        },
        {
            title: "Amount",
            dataIndex: "amount",
        },
        {
            title: "Created",
            render: (value) => moment(value?.createdAt).format('LL'),
        },
        {
            title: "Expire",
            // dataIndex: "quantity",
            render: (value) => moment(value?.expiredAt).format('LL'),
        },
        {
            title: "TranId",
            dataIndex: "trnId",
        },
        {
            title: "Car Add limit",
            dataIndex: "package",
            render: (value) => value?.carCreateLimit,
        },
    ];

    return (
        <div>

            {
                (isSuccess && data?.data?.length > 0) && <h4 className='text-white text-lg'>All subscriptions by -- {data?.data[0]?.user?.name}</h4>
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
                        dataSource={data?.data || []}
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