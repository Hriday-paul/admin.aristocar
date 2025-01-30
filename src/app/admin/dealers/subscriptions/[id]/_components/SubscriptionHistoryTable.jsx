'use client'
import InvoiceContent from '@/components/shared/Print/InvoiceContent';
import Print from '@/components/shared/Print/Print';
import SheetContent from '@/components/shared/Print/SheetContent';
import { useGetSubscriptionsBy_idQuery } from '@/redux/api/income.api';
import { ConfigProvider, Table } from 'antd';
import moment from 'moment';
import React, { useRef } from 'react';
import { FaPrint } from 'react-icons/fa6';
import { MdOutlinePrint } from 'react-icons/md';
import { useReactToPrint } from 'react-to-print';

const SubscriptionHistoryTable = ({ id }) => {
    const query = { limit: 999999999999999 };

    const { isLoading, isFetching, data, isSuccess } = useGetSubscriptionsBy_idQuery({ id: id, query: query })
    const contentRef = useRef(null);

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
        {
            title: "Action",
            render: (value) => (

                <Print clicker={<button className='flex items-center gap-x-1'>
                    <FaPrint />
                    <span>Print</span>
                </button>} title={'invoice'} >
                    <InvoiceContent data={value} />
                </Print>

            ),
        },
    ];

    const handlePrint = useReactToPrint({
        contentRef: contentRef,
        pageStyle: `@page { size: landscape; margin: 10mm;`
    });

    console.log(data?.data?.data)

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

                    {isSuccess && <button onClick={handlePrint} className={`inline-flex items-center justify-center gap-x-1 rounded btn-default !px-4 !py-3 text-sm bg-white mb-4`}>
                        <p className='flex items-center gap-x-1'>
                            <MdOutlinePrint />
                            <span>Print Payments</span>
                        </p>
                    </button>}

                    {
                        isSuccess && <div className="hidden overflow-hidden">
                            <div ref={contentRef}>
                                <SheetContent payments={data?.data?.data} />
                            </div>
                        </div>
                    }

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