'use client'
import FormWrapper from '@/components/Form/FormWrapper';
import UDatePicker from '@/components/Form/UDatePicker';
import Print from '@/components/shared/Print/Print';
import SheetContent from '@/components/shared/Print/SheetContent';
import { useGetAllPaymentsMutation } from '@/redux/api/income.api';
import { printAllPaymentsSchema } from '@/schema/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Modal } from 'antd';
import { Loader } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

const PrintAllPayments = ({ children }) => {
    const contentRef = useRef(null);
    const [getAllPayment, { isLoading, isSuccess, data }] = useGetAllPaymentsMutation()
    const [open, setOpen] = useState(false)

    const handelSubmit = async (data) => {
        const [year, month] = data?.date?.split('/')
        try {
            const res = await getAllPayment({ year: year, month: Number(month) - 1 }).unwrap();

            if (res.success) {
                setTimeout(() => {
                    handlePrint();
                }, 500)
            }

        } catch (error) {
            ErrorModal(error?.message || error?.data?.message || "Something went wrong, try again");
        } finally {
            setOpen(false)
        }
    };

    const handlePrint = useReactToPrint({
        contentRef: contentRef,
        pageStyle: `@page { size: landscape; margin: 10mm;`
    });

    return (
        <div>
            <>
                <span onClick={() => setOpen(true)}>
                    {children}
                </span>
                {
                    isSuccess && <div className="hidden overflow-hidden">
                        <div ref={contentRef}>
                            <SheetContent payments={data?.data} />
                        </div>
                    </div>
                }
                <Modal
                    centered
                    open={open}
                    setOpen={setOpen}
                    footer={null}
                    onCancel={() => {
                        setOpen(false);
                    }}
                    title={"Print all payments by date"}
                >
                    <FormWrapper onSubmit={handelSubmit} resolver={zodResolver(printAllPaymentsSchema)}>

                        <UDatePicker
                            name={'date'}
                            label={'Year & Month'}
                            picker='month'
                            format={"YYYY/MM"}
                        />

                        {isLoading ? (
                            <Button
                                disabled
                                className="!h-11 w-full !rounded-full !border-white !font-medium !transition-all !duration-300 !ease-in-out !bg-black !text-white"
                            >
                                <Loader className="mr-2 h-5 w-5 animate-spin" />
                                Print
                            </Button>
                        ) : (
                            <Button
                                loading={isLoading}
                                disabled={isLoading}
                                htmlType="submit"
                                size="large"
                                className="!h-11 w-full !rounded-full !border-white !font-medium !transition-all !duration-300 !ease-in-out !bg-black !text-white"
                            >
                                Submit
                            </Button>
                        )}
                    </FormWrapper>

                </Modal>
            </>
        </div>
    );
};

export default PrintAllPayments;