"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UDatePicker from "@/components/Form/UDatePicker";
import UInput from "@/components/Form/UInput";
import { useUpdateUserMutation } from "@/redux/api/authApi";
import { useCreateProductMutation } from "@/redux/api/productsApi";
import { addFreeAccessSchema } from "@/schema/authSchema";
import { ErrorModal, SuccessModal } from "@/utils/modalHook";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Modal } from "antd";
import dayjs from "dayjs";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function AddFreeAccess({ children, userId }) {
    const [updateFn, { isLoading }] = useUpdateUserMutation();
    const [open, setOpen] = useState(false)

    const form = useForm();

    const handelSubmit = async (data) => {

        try {
            const re_body = { freeExpairDate: data?.expired_date, freeLimit: data?.max_list }
            const res = await updateFn({
                id: userId,
                data: re_body,
            }).unwrap();

            if (res?.success) {
                SuccessModal("Free access added successfully");
            } else {
                ErrorModal(res?.message);
            }
        } catch (error) {
            ErrorModal(error?.message || error?.data?.message || "Something went wrong, try again");
        } finally {
            setOpen(false)
        }
    };

    return (
        <>
            <span onClick={() => setOpen(true)}>
                {children}
            </span>
            <Modal
                centered
                open={open}
                setOpen={setOpen}
                footer={null}
                onCancel={() => {
                    setOpen(false);
                }}
                title={"Add Free Access"}
            >
                <FormWrapper onSubmit={handelSubmit} {...form} resolver={zodResolver(addFreeAccessSchema)}>

                    <UDatePicker
                        name="expired_date"
                        label="Expired date"
                        required={true}
                        placeholder="Enter expired date"
                        minDate={dayjs()}
                    />
                    <UInput
                        type="number"
                        name="max_list"
                        label="Max list amount"
                        required={true}
                        placeholder="Enter List Amount"
                    />

                    {isLoading ? (
                        <Button
                            disabled
                            className="!h-11 w-full !rounded-full !border-white !font-medium !transition-all !duration-300 !ease-in-out !bg-black !text-white"
                        >
                            <Loader className="mr-2 h-5 w-5 animate-spin" />
                            Creating in...
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
    );
}


export default AddFreeAccess;